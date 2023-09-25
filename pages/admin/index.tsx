import ContentWrapper from "@/components/admin/ContentWrapper";
import LatestCommentListCard from "@/components/admin/LatestCommentListCard";
import LatestPostListCard from "@/components/admin/LatestPostListCard";
import AdminNav from "@/components/common/nav/AdminNav";
import AdminLayout from "@/components/layout/AdminLayout";
import { NextPage } from "next";

interface Props {}

const Admin: NextPage<Props> = () => {
  return (
    <AdminLayout>
      <div className="flex space-x-10">
        <ContentWrapper seeAllRoute="/admin" title="Latest Posts">
          <LatestPostListCard
            title="This is my Title"
            slug="this is the slug"
            meta="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora consectetur iste quod dolore, voluptate minima excepturi ipsa labore quae, temporibus eum eaque vel laborum sed fugiat, rem consequatur. Consectetur unde quis, expedita sunt odit temporibus dolore enim optio voluptas nihil dignissimos pariatur nemo impedit iusto amet blanditiis harum quia? Quasi?"
          />
        </ContentWrapper>
        <ContentWrapper seeAllRoute="/admin" title="Latest Comments">
          {/* <LatestCommentListCard comment={} /> */}
        </ContentWrapper>
      </div>
    </AdminLayout>
  );
};

export default Admin;
