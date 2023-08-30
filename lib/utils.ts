import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import dbConnect from "./dbConnect";
import Post, { PostModelSchema } from "@/models/Post";
import { PostDetail } from "@/utils/types";

interface FormidablePromise<T> {
  files: { [key: string]: formidable.File };
  body: T;
}

export const readFile = async <T extends object>(
  req: NextApiRequest
): Promise<FormidablePromise<T>> => {
  const form = formidable();
  const [fields, files] = await form.parse(req);

  const result: any = {};

  if (!result.body) result.body = {};
  if (!result.files) result.files = {};

  for (let key in fields) {
    result.body[key] = fields[key][0];
  }

  for (let key in files) {
    const file = files[key][0];
    result.files[key] = file;
  }

  return result;
};

export const readPostsFromDb = async (limit: number, pageNo: number) => {
  const skip = limit * pageNo;
  await dbConnect();
  // finds posts, sorts by createdAt descending, skip increases as we increase page number, Limit to only fetch limited posts.
  const posts = await Post.find()
    .sort({ createdAt: "desc" })
    .select("-content")
    .skip(skip)
    .limit(limit);

  return posts;
};

export const formatPosts = (posts: PostModelSchema[]): PostDetail[] => {
  return posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    createdAt: post.createdAt.toString(),
    thumbnail: post.thumbnail?.url || "",
    meta: post.meta,
    tags: post.tags,
  }));
};
