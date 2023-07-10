import AdminNav from "@/components/common/AdminNav";
import { NextPage } from "next";

interface Props {}

const Admin: NextPage<Props> = () => {
  return (
    <div>
      <AdminNav />
    </div>
  );
};

export default Admin;
