import Editor, { FinalPost } from "@/components/editor";
import AdminLayout from "@/components/layout/AdminLayout";
import { generateFormData } from "@/utils/helper";
import axios from "axios";
import { NextPage } from "next";

interface Props {}

const Create: NextPage<Props> = () => {
  const handleSubmit = async (post: FinalPost) => {
    try {
      // we have to generate FormData
      const formData = generateFormData(post);

      // submit our post
      const { data } = await axios.post("/api/posts", formData);

      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
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
