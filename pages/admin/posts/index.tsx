import AdminNav from "@/components/common/AdminNav";
import InfiniteScrollPosts from "@/components/common/InfiniteScrollPosts";
import PostCard from "@/components/common/PostCard";
import AdminLayout from "@/components/layout/AdminLayout";
import { formatPosts, readPostsFromDb } from "@/lib/utils";
import { PostDetail } from "@/utils/types";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { useState } from "react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

let pageNo = 0;
const limit = 9;

const Posts: NextPage<Props> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  return (
    <AdminLayout>
      <InfiniteScrollPosts />
    </AdminLayout>
  );
};

interface ServerSideResponse {
  posts: PostDetail[];
}

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

export default Posts;
