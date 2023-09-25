import ContentWrapper from "@/components/admin/ContentWrapper";
import AdminNav from "@/components/common/nav/AdminNav";
import AdminLayout from "@/components/layout/AdminLayout";
import { NextPage } from "next";

interface Props {}

const Admin: NextPage<Props> = () => {
  return (
    <AdminLayout>
      <div className="flex space-x-10">
        <ContentWrapper seeAllRoute="/admin" title="Latest Posts">
          <></>
        </ContentWrapper>
        <ContentWrapper seeAllRoute="/admin" title="Latest Comments">
          <></>
        </ContentWrapper>
      </div>
    </AdminLayout>
  );
};

export default Admin;
