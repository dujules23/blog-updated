import { FC } from "react";
import { GitHubAuthButton } from "../button";
import CommentForm from "./CommentForm";
import useAuth from "@/hooks/useAuth";
import axios from "axios";

interface Props {
  belongsTo: string;
}

const Comments: FC<Props> = ({ belongsTo }): JSX.Element => {
  const userProfile = useAuth();

  const handleNewCommentSubmit = async (content: string) => {
    const comment = await axios
      .post("/api/comment", { content, belongsTo })
      .then(({ data }) => data.comment)
      .catch((err) => console.log(err));
    console.log(comment);
  };

  return (
    <div className="py-20">
      {userProfile ? (
        <CommentForm onSubmit={handleNewCommentSubmit} title="Add comment" />
      ) : (
        <div className="flex flex-col items-end space-y-2">
          <h3 className="text-secondary-dark text-x1 font-semibold">
            Log in to add comment
          </h3>
          <GitHubAuthButton />
        </div>
      )}
    </div>
  );
};

export default Comments;
