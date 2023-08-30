import AdminNav from "@/components/common/AdminNav";
import PostCard from "@/components/common/PostCard";
import AdminLayout from "@/components/layout/AdminLayout";
import { NextPage } from "next";
import { useState } from "react";

interface Props {}
const posts = [
  {
    title: "Street fighter 6 Tips (Part 1)",
    slug: "street-fighter-6-tips-part-1",
    meta: "These are some basic approaches to start playing Street Fighter 6",
    tags: ["post"],
    thumbnail:
      "https://media.eventhubs.com/images/2023/08/05_first-look-aki-bnrt.webp",
    createdAt: new Date().toString(),
  },
  {
    title: "Street fighter 6 Tips (Part 2)",
    slug: "street-fighter-6-tips-part-2",
    meta: "Part 2 in the SF6 tips series",
    tags: ["post"],
    thumbnail:
      "https://www.gameshub.com/wp-content/uploads/sites/5/2023/07/street-fighter-6-world-tour-rashid-gameshub-08.jpg?w=1024",
    createdAt: new Date().toString(),
  },
  {
    title: "Street fighter 6 Tips (Part 3)",
    slug: "street-fighter-6-tips-part-3",
    meta: "Part 2 in the SF6 tips series",
    tags: ["post"],
    thumbnail: "https://i.ytimg.com/vi/XvbudLcwgWs/maxresdefault.jpg",
    createdAt: new Date().toString(),
  },
  {
    title: "Street fighter 6 Tips (Part 3)",
    slug: "street-fighter-6-tips-part-3",
    meta: "Part 2 in the SF6 tips series",
    tags: ["post"],
    thumbnail: "https://i.ytimg.com/vi/XvbudLcwgWs/maxresdefault.jpg",
    createdAt: new Date().toString(),
  },
  {
    title: "Street fighter 6 Tips (Part 3)",
    slug: "street-fighter-6-tips-part-3",
    meta: "Part 2 in the SF6 tips series",
    tags: ["post"],
    thumbnail: "https://i.ytimg.com/vi/XvbudLcwgWs/maxresdefault.jpg",
    createdAt: new Date().toString(),
  },
  {
    title: "Street fighter 6 Tips (Part 3)",
    slug: "street-fighter-6-tips-part-3",
    meta: "Part 2 in the SF6 tips series",
    tags: ["post"],
    thumbnail: "https://i.ytimg.com/vi/XvbudLcwgWs/maxresdefault.jpg",
    createdAt: new Date().toString(),
  },
];

const Posts: NextPage<Props> = () => {
  const [postsToRender, setPostsToRender] = useState(posts);
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-3">
        <div className="grid grid-cols-3 gap-4">
          {postsToRender.map((post, index) => (
            <PostCard post={post} key={index} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Posts;
