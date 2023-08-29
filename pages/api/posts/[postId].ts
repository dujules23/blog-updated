import { readFile } from "@/lib/utils";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import Post from "@/models/Post";
import { NextApiHandler } from "next";
import { textChangeRangeNewSpan } from "typescript";

export const config = {
  api: { bodyParser: false },
};
// types for body, maybe export these to be shared?
type bodyTypes = {
  title: string;
  content: string;
  slug: string;
  meta: string;
  tags: string;
};
// notice Patch and not Put here, we just to edit specific parts of our post
const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case "PATCH":
      return updatePost(req, res);
    default:
      res.status(404).send("Not Found!");
  }
};
// update post function
const updatePost: NextApiHandler = async (req, res) => {
  const postId = req.query.postId as string;
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post not found!" });

  const { files, body } = await readFile<bodyTypes>(req);

  let tags = [];
  // tags will be in string form so converting to array
  if (body.tags) tags = JSON.parse(body.tags as string);

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(400).json({ error });

  const { title, content, meta, slug } = body;
  post.title = title;
  post.content = content;
  post.meta = meta;
  post.tags = tags;
  post.slug = slug;

  await post.save();
  res.json({ post });
};

export default handler;
