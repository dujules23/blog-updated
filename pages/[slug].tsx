import DefaultLayout from "@/components/layout/DefaultLayout";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { Trykker } from "next/font/google";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePost: NextPage<Props> = ({ post }) => {
  return (
    <DefaultLayout>
      {post.slug}
      {post.title}
      {post.content}
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
    await dbConnect;
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
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
