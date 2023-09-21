import { FC, useEffect, useState } from "react";
import { GitHubAuthButton } from "../button";
import CommentForm from "./CommentForm";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { CommentResponse } from "@/utils/types";
import CommentCard from "./CommentCard";

interface Props {
  belongsTo: string;
}

const Comments: FC<Props> = ({ belongsTo }): JSX.Element => {
  const [comments, setComments] = useState<CommentResponse[]>();

  const userProfile = useAuth();

  const handleNewCommentSubmit = async (content: string) => {
    const newComment = await axios
      .post("/api/comment", { content, belongsTo })
      .then(({ data }) => data.comment)
      .catch((err) => console.log(err));
    if (newComment && comments) setComments([...comments, newComment]);
    else setComments([newComment]);
  };

  useEffect(() => {
    axios(`/api/comment?belongsTo=${belongsTo}`)
      .then(({ data }) => {
        setComments(data.comments);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="py-20 space-y-4">
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

      {comments?.map(({ id, owner, createdAt, content }) => {
        return (
          <div key={id}>
            <CommentCard profile={owner} date={createdAt} content={content} />
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
