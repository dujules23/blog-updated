import dbConnect from "@/lib/dbConnect";
import { formatComment, isAuth } from "@/lib/utils";
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
  // checks for authentication
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: "unauthorized request!" });

  const { commentId } = req.body;
  // checks to see if the comment id is valid
  if (!isValidObjectId(commentId))
    return res.status(422).json({ error: "invalid comment id!" });
  // connects to database
  await dbConnect();

  const comment = await Comment.findById(commentId)
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
    });

  if (!comment) return res.status(404).json({ error: "Comment not found!" });

  const oldLikes = comment.likes || [];
  const likedBy = user.id as any;

  // like and unlike
  // this is for unlike
  if (oldLikes.includes(likedBy)) {
    // filters through old likes, if the like is equal to the liked by user, it will be removed from likes
    comment.likes = oldLikes.filter(
      (like) => like.toString() !== likedBy.toString()
    );
  }
  // this is to like comment
  else comment.likes = [...oldLikes, likedBy];

  await comment.save();
  res.status(201).json({
    comment: {
      ...formatComment(comment, user),
      replies: comment.replies?.map((reply: any) => formatComment(reply, user)),
    },
  });
};

export default handler;
