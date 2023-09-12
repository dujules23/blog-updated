import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";
import { formatPosts, readFile, readPostsFromDb } from "@/lib/utils";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import Post from "@/models/Post";
import { IncomingPost } from "@/utils/types";
import formidable from "formidable";
import Joi from "joi";
import { NextApiHandler } from "next";
import { parseJsonText } from "typescript";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return readPosts(req, res);
    case "POST":
      return createNewPost(req, res);
  }
};

const createNewPost: NextApiHandler = async (req, res) => {
  const { body, files } = await readFile<IncomingPost>(req);

  console.log(body);

  let tags = [];
  // tags will be in string form so converting to array
  if (body.tags) tags = JSON.parse(body.tags as string);

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(400).json({ error: error });

  const { title, content, slug, meta } = body;

  await dbConnect();
  const alreadyExists = await Post.findOne({ slug: body.slug });
  if (alreadyExists)
    return res.status(400).json({ error: "Slug needs to be unique!" });

  const newPost = new Post({
    title,
    content,
    slug,
    meta,
    tags,
  });

  // uploading thumbnail if there is any
  const thumbnail = files.thumbnail as formidable.File;
  if (thumbnail) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: "dev-blogs",
      }
    );
    newPost.thumbnail = { url, public_id };
  }

  await newPost.save();

  res.json({ post: newPost });
};

const readPosts: NextApiHandler = async (req, res) => {
  try {
    const { limit, pageNo, skip } = req.query as {
      limit: string;
      pageNo: string;
      skip: string;
    };
    const posts = await readPostsFromDb(
      parseInt(limit),
      parseInt(pageNo),
      parseInt(skip)
    );
    res.json({ posts: formatPosts(posts) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
