import dbConnect from "@/lib/dbConnect";
import { isAuth } from "@/lib/utils";
import { commentValidationSchema, validateSchema } from "@/lib/validator";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      return createNewComment(req, res);

    default:
      res.status(404).send("Not Found.");
  }
};

// creating new comment, checks if the user is authorized, if not, returns 403 status
const createNewComment: NextApiHandler = async (req, res) => {
  // const user = await isAuth(req, res);
  // if (!user) return res.status(403).json({ error: "unauthorized request!" });

  const error = validateSchema(commentValidationSchema, req.body);
  if (error) return res.status(422).json({ error });

  // creating the comment
  await dbConnect();
  const { belongsTo, content } = req.body;
  const post = await Post.findById(belongsTo);
  if (!post) return res.status(401).json({ error: "Invalid Post" });

  const comment = new Comment({
    content,
    belongsTo,
    owner: "64f6af75a16d819b21b7adb0",
    chiefComment: true,
  });

  await comment.save();
  res.status(201).json(comment);
};

export default handler;
