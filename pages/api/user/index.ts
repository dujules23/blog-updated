import { isAdmin } from "@/lib/utils";
import User from "@/models/User";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return getLatestUsers(req, res);

    default:
      res.status(404).send("Not Found!");
  }
};

const getLatestUsers: NextApiHandler = async (req, res) => {
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(403).json({ error: "Unauthorized request!" });

  const { pageNo = "0", limit = "5" } = req.query as {
    pageNo: string;
    limit: string;
  };

  // results are only looking for user roles NOT admin roles
  const results = await User.find({ role: "user" })
    .sort({ createdAt: "desc" })
    .skip(parseInt(pageNo) * parseInt(limit))
    .limit(parseInt(limit))
    .select("name email avatar provider");

  const users = results.map(({ _id, name, avatar, provider }) => ({
    id: _id,
    name,
    avatar,
    provider,
  }));

  res.json({ users });
};

export default handler;
