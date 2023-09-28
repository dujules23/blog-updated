import Comments from "@/components/common/Comments";
import AdminLayout from "@/components/layout/AdminLayout";
import { NextPage } from "next";

interface Props {}

const AdminComments: NextPage<Props> = () => {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <Comments fetchAll />
      </div>
    </AdminLayout>
  );
};

export default AdminComments;
