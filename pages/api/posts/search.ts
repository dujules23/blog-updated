import dbConnect from "@/lib/dbConnect";
import { formatPosts, isAdmin } from "@/lib/utils";
import Post from "@/models/Post";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") return res.status(404).send("Not found!");

  // checks for admin role
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(403).json({ error: "Unauthorized access!" });

  // if no title query, the search is not valid
  const title = req.query.title as string;
  if (!title.trim())
    return res.status(400).json({ error: "Invalid search query!" });

  // connect to the database ato locate the title from query, NOT case sensitive
  await dbConnect();
  const posts = await Post.find({ title: { $regex: title, $options: "i" } });

  res.json({ results: formatPosts(posts) });
};

export default handler;
