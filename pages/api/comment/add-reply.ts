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
      return addReplyToComment(req, res);

    default:
      res.status(404).send("Not Found.");
  }
};

// creating new comment, checks if the user is authorized, if not, returns 403 status
const addReplyToComment: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: "unauthorized request!" });

  const error = validateSchema(commentValidationSchema, req.body);
  if (error) return res.status(422).json({ error });

  const { repliedTo } = req.body;
  if (!isValidObjectId(repliedTo))
    return res.status(422).json({ error: "invalid comment id!" });

  await dbConnect();

  const chiefComment = await Comment.findOne({
    _id: repliedTo,
    chiefComment: true,
  });
  if (!chiefComment)
    return res.status(404).json({ error: "Comment not found!" });

  const replyComment = new Comment({
    owner: user.id,
    repliedTo,
    content: req.body.content,
  });

  if (chiefComment.replies)
    chiefComment.replies = [...chiefComment.replies, replyComment._id];

  // saves the comments
  await chiefComment.save();
  await replyComment.save();

  res.status(201).json({ comment: replyComment });
};

export default handler;