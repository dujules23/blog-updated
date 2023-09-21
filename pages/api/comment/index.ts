import dbConnect from "@/lib/dbConnect";
import { formatComment, isAuth } from "@/lib/utils";
import { commentValidationSchema, validateSchema } from "@/lib/validator";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import User from "@/models/User";
import { isValidObjectId } from "mongoose";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      return createNewComment(req, res);
    case "DELETE":
      return removeComment(req, res);
    case "PATCH":
      return updateComment(req, res);
    case "GET":
      return readComments(req, res);

    default:
      res.status(404).send("Not Found.");
  }
};

// creating new comment, checks if the user is authorized, if not, returns 403 status
const createNewComment: NextApiHandler = async (req, res) => {
  // check if the user is authorized
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: "unauthorized request!" });

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
    owner: user.id,
    chiefComment: true,
  });

  await comment.save();
  res.status(201).json(comment);
};
// endpoint for removing a comment
const removeComment: NextApiHandler = async (req, res) => {
  // check if the user is authorized
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: "unauthorized request!" });

  // if chief comment removes other related comments (replies) as well.

  const { commentId } = req.query;
  if (!commentId || !isValidObjectId(commentId))
    return res.status(422).json({ error: "Invalid request!" });

  await dbConnect();

  const comment = await Comment.findOne({
    _id: commentId,
    owner: user.id,
  });

  if (!comment) return res.status(404).json({ error: "Comment not found!" });

  // if chief comment removes other related comments (replies) as well.
  if (comment.chiefComment) await Comment.deleteMany({ repliedTo: commentId });
  else {
    // if this is the reply comment remove from the chiefComments replies section.
    const chiefComment = await Comment.findById(comment.repliedTo);
    if (chiefComment?.replies?.includes(commentId as any)) {
      chiefComment.replies = chiefComment.replies.filter(
        (cId) => cId.toString() === commentId
      );

      await chiefComment.save();
    }
  }

  // then remove the actual comment
  await Comment.findByIdAndDelete(commentId);
  res.json({ removed: true });
};

const updateComment: NextApiHandler = async (req, res) => {
  // check if the user is authorized
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: "unauthorized request!" });

  const error = validateSchema(commentValidationSchema, req.body);
  if (error) return res.status(422).json({ error });

  const { commentId } = req.query;
  if (!commentId || !isValidObjectId(commentId))
    return res.status(422).json({ error: "Invalid request!" });

  await dbConnect();

  const comment = await Comment.findOne({
    _id: commentId,
    owner: user.id,
  });

  if (!comment) return res.status(404).json({ error: "Comment not found!" });

  comment.content = req.body.content;
  await comment.save();
  res.json(comment);
};

const readComments: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  const { belongsTo } = req.query;

  if (!belongsTo || !isValidObjectId(belongsTo))
    return res.status(422).json({ error: "Invalid request!" });

  await dbConnect();

  const comment = await Comment.findOne({ belongsTo })
    .populate({
      path: "owner",
      select: "name avatar",
    })
    .populate({
      path: "replies",
      populate: {
        path: "owner",
        select: "name avatar",
      },
    })
    .select("createdAt likes content repliedTo");

  if (!comment) return res.json({ comment });
  const formattedComment = {
    ...formatComment(comment, user),
    replies: comment.replies?.map((c: any) => formatComment(c, user)),
  };
  res.json({ comment: formattedComment });
};

export default handler;
