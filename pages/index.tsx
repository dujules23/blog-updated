import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { formatPosts, readPostsFromDb } from "@/lib/utils";
import { PostDetail, UserProfile } from "@/utils/types";
import InfiniteScrollPosts from "@/components/common/InfiniteScrollPosts";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { filterPosts } from "@/utils/helper";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<Props> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(posts.length >= limit);

  const { data } = useSession();
  const profile = data?.user as UserProfile;

  const isAdmin = profile && profile.role === "admin";

  // pagination function
  const fetchMorePosts = async () => {
    try {
      // increases page number
      pageNo++;
      // api call using page number and limit to get next page of data
      const { data } = await axios(
        `/api/posts?limit=${limit}&skip=${postsToRender.length}`
      );
      // checks to see if the length of posts are less than 9 (limit), we ran out of posts in the database
      if (data.posts.length < limit) {
        // sets posts, as we scroll down we add the posts that were brought in through the endpoint
        setPostsToRender([...postsToRender, ...data.posts]);
        setHasMorePosts(false);
      } else {
        setPostsToRender([...postsToRender, ...data.posts]);
      }
    } catch (error) {
      setHasMorePosts(false);
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      {/* <div className="pb-20"></div> */}
      <InfiniteScrollPosts
        hasMore={hasMorePosts}
        next={fetchMorePosts}
        dataLength={postsToRender.length}
        posts={postsToRender}
        showControls={isAdmin}
        onPostRemoved={(post) =>
          setPostsToRender(filterPosts(postsToRender, post))
        }
      />
    </DefaultLayout>
  );
};

interface ServerSideResponse {
  posts: PostDetail[];
}

let pageNo = 0;
const limit = 9;

export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async () => {
  try {
    // read posts
    const posts = await readPostsFromDb(limit, pageNo);

    // format posts
    const formattedPosts = formatPosts(posts);
    return {
      props: {
        posts: formattedPosts,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default Home;
