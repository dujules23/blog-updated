import DefaultLayout from "@/components/layout/DefaultLayout";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import parse from "html-react-parser";
import Image from "next/image";
import dateFormat from "dateformat";
import Comments from "@/components/common/Comments";
import LikeHeart from "@/components/common/LikeHeart";
import { useCallback, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { signIn } from "next-auth/react";
import axios from "axios";

type Props = InferGetStaticPropsType<typeof getStaticProps>;
// seems to be an issue in production, check postman for 404 issue
const SinglePost: NextPage<Props> = ({ post }) => {
  const [likes, setLikes] = useState({ likedByOwner: false, count: 0 });
  const { id, title, content, tags, meta, slug, thumbnail, createdAt } = post;

  const user = useAuth();

  const getLikeLabel = useCallback((): string => {
    const { likedByOwner, count } = likes;

    if (likedByOwner && count === 1) return "You liked this post.";
    if (likedByOwner) return `You and ${count - 1} other likes this post.`;

    if (count === 0) return "Like this post.";

    // if (count === 1) return `${count} person liked this post.`;

    return count + " people liked this post";
  }, [likes]);

  const handleOnLikeClick = async () => {
    try {
      // if user is not logged in, direct to sign in page
      if (!user) return await signIn("github");
      const { data } = await axios.post(`/api/posts/update-like?postId=${id}`);

      setLikes({ likedByOwner: !likes.likedByOwner, count: data.newLikes });
    } catch (error) {
      console.log(error);
    }
  };

  // fetches likes for each post that have already been made.
  useEffect(() => {
    axios(`/api/posts/like-status?postId=${id}`)
      .then(({ data }) =>
        setLikes({ likedByOwner: data.likedByOwner, count: data.likesCount })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <DefaultLayout title={title} desc={meta}>
      <div className="lg:px-0 px-3">
        {thumbnail ? (
          <div className="relative aspect-video">
            <Image src={thumbnail} alt={title} fill />
          </div>
        ) : null}

        <h1 className="text-6xl font-semibold text-primary-dark dark:text-primary py-2">
          {title}
        </h1>

        <div className="flex items-center justify-between py-2 dark:text-secondary-light text-secondary-dark">
          {tags.map((t, index) => (
            <span key={t + index}>#{tags}</span>
          ))}
          <span>{dateFormat(createdAt, "d-mmm-yyyy")}</span>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-full mx-auto">
          {parse(content)}
        </div>
        {/* Comment form */}

        <div className="py-10">
          <LikeHeart
            liked={likes.likedByOwner}
            label={getLikeLabel()}
            onClick={handleOnLikeClick}
          />
        </div>
        <Comments belongsTo={id} />
      </div>
    </DefaultLayout>
  );
};

export default SinglePost;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // connect to the database
    await dbConnect();
    // finds posts but only related to slug (post that was clicked)
    const posts = await Post.find().select("slug");
    const paths = posts.map(({ slug }) => ({
      params: {
        slug,
      },
    }));
    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    // if any errors it will route to the home route
    return {
      paths: [{ params: { slug: "/" } }],
      fallback: false,
    };
  }
};

interface StaticPropsResponse {
  post: {
    id: string;
    title: string;
    content: string;
    meta: string;
    tags: string[];
    slug: string;
    thumbnail: string;
    createdAt: string;
  };
}

export const getStaticProps: GetStaticProps<
  StaticPropsResponse,
  { slug: string }
> = async ({ params }) => {
  try {
    // connect to database
    await dbConnect();
    const post = await Post.findOne({ slug: params?.slug });
    if (!post) return { notFound: true };

    const { _id, title, content, meta, slug, tags, thumbnail, createdAt } =
      post;
    return {
      props: {
        post: {
          id: _id.toString(),
          title,
          content,
          meta,
          slug,
          tags,
          thumbnail: thumbnail?.url || "",
          createdAt: createdAt.toString(),
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
