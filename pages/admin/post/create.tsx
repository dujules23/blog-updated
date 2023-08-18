import Editor, { FinalPost } from "@/components/editor";
import AdminLayout from "@/components/layout/AdminLayout";
import axios from "axios";
import { NextPage } from "next";

interface Props {}

const Create: NextPage<Props> = () => {
  const handleSubmit = async (post: FinalPost) => {
    // we have to generate FormData
    const formData = new FormData();

    for (let key in post) {
      const value = (post as any)[key];
      if (key === "tags") {
        // loops through array to remove blank spaces
        const tags = value.split(",").map((item: string) => item.trim());
        formData.append("tags", JSON.stringify(tags));
      } else formData.append(key, value);
    }
    // submit our post

    const { data } = await axios.post("/api/posts", formData);

    console.log(data);
  };

  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
};

export default Create;
