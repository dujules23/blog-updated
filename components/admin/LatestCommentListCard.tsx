import { FC } from "react";
import ProfileIcon from "../common/ProfileIcon";
import parse from "html-react-parser";
import { trimText } from "@/utils/helper";
import { BsBoxArrowUpRight } from "react-icons/bs";

interface LatestComment {
  id: string;
  owner: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  belongsTo: {
    id: string;
    title: string;
    slug: string;
  };
}

interface Props {
  comment: LatestComment;
}
const LatestCommentListCard: FC<Props> = ({ comment }): JSX.Element => {
  const { owner, belongsTo, content } = comment;
  return (
    <div className="flex space-x-2">
      <ProfileIcon nameInitial={owner.name[0]} avatar={owner.avatar} />

      <div className="flex-1">
        <p className="font-semibold text-primary-dark dark:text-primary transition">
          {owner.name}{" "}
          <span className="text-sm text-secondary-dark">Commented On</span>
        </p>

        <a
          href={"/" + belongsTo.slug}
          target="_blank"
          rel="noreferrer noopener"
          className="text-secondary-dark hover:underline"
        >
          {" "}
          <div className="flex items-center space-x-2">
            <BsBoxArrowUpRight size={12} />
            {trimText(belongsTo.title, 30)}
          </div>
        </a>
        <p className="text-primary-dark dark:text-primary transition">
          {parse(content)}
        </p>
      </div>
    </div>
  );
};

export default LatestCommentListCard;
