import Editor, { FinalPost } from "@/components/editor";
import AdminLayout from "@/components/layout/AdminLayout";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

interface PostResponse extends FinalPost {
  id: string;
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Update: NextPage<Props> = ({ post }) => {
  return (
    <AdminLayout>
      <Editor initialValue={post} onSubmit={() => {}} btnTitle="Update" />
    </AdminLayout>
  );
};

interface ServerSideResponse {
  post: PostResponse;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async (context) => {
  const slug = context.query.slug as string;

  await dbConnect();
  const post = await Post.findOne({ slug });
  if (!post) return { notFound: true };

  const { _id, meta, title, content, thumbnail, tags } = post;

  return {
    props: {
      post: {
        id: _id.toString(),
        title,
        content,
        tags: tags.join(", "),
        thumbnail: thumbnail?.url || "",
        slug,
        meta,
      },
    },
  };
};

export default Update;
