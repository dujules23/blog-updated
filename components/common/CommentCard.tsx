import { FC, ReactNode, useState } from "react";
import ProfileIcon from "./ProfileIcon";
import dateFormat from "dateformat";
import parse from "html-react-parser";
import {
  BsFillReplyAllFill,
  BsFillTrashFill,
  BsPencilSquare,
} from "react-icons/bs";
import CommentForm from "./CommentForm";

interface CommentOwnersProfile {
  name: string;
  avatar?: string;
}

interface Props {
  profile: CommentOwnersProfile;
  date: string;
  content: string;
}

const CommentCard: FC<Props> = ({ profile, date, content }): JSX.Element => {
  const { name, avatar } = profile;
  const [showForm, setShowForm] = useState(false);
  const [initialState, setInitialState] = useState("");

  const displayReplyForm = () => {
    setInitialState("");
    setShowForm(true);
  };
  const hideReplyForm = () => {
    setShowForm(false);
  };

  const handleOnReplyClick = () => {
    displayReplyForm();
  };

  const handleOnEditClick = () => {
    displayReplyForm();
    setInitialState(content);
  };
  const handleCommentSubmit = () => {};

  return (
    <div className="flex space-x-3">
      <ProfileIcon nameInitial={name[0].toUpperCase()} avatar={avatar} />
      <div className="flex-1">
        <h1 className="text-lg text-primary-dark dark:text-primary font-semibold">
          {name}
        </h1>
        <span className="text-sm text-secondary-dark">
          {dateFormat(date, "d-mmm-yyyy")}
        </span>
        <div className="text-primary-dark dark:text-primary">
          {parse(content)}
        </div>

        <div className="flex space-x-4">
          <Button onClick={handleOnReplyClick}>
            <BsFillReplyAllFill />
            <span>Reply</span>
          </Button>
          <Button onClick={handleOnEditClick}>
            <BsPencilSquare />
            <span>Edit</span>
          </Button>
          <Button>
            <BsFillTrashFill />
            <span>Delete</span>
          </Button>
        </div>
        {showForm && (
          <div className="mt-3">
            <CommentForm
              onSubmit={handleCommentSubmit}
              onClose={hideReplyForm}
              initialState={initialState}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;

interface ButtonProps {
  children: ReactNode;
  onClick?(): void;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-primary-dark dark:text-primary space-x-2"
    >
      {children}
    </button>
  );
};
