import dbConnect from "@/lib/dbConnect";
import { isAuth } from "@/lib/utils";
import { commentValidationSchema, validateSchema } from "@/lib/validator";
import Comment from "@/models/Comment";
import { isValidObjectId } from "mongoose";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      return updateLike(req, res);

    default:
      res.status(404).send("Not Found.");
  }
};

// creating new comment, checks if the user is authorized, if not, returns 403 status
const updateLike: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: "unauthorized request!" });

  const { commentId } = req.body;

  if (!isValidObjectId(commentId))
    return res.status(422).json({ error: "invalid comment id!" });

  await dbConnect();

  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json({ error: "Comment not found!" });
};

export default handler;
