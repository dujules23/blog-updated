import { FC } from "react";
import ProfileIcon from "./ProfileIcon";

interface CommentOwnersProfile {
  name: string;
  avatar?: string;
}

interface Props {
  profile: CommentOwnersProfile;
}

const CommentCard: FC<Props> = ({ profile }): JSX.Element => {
  const { name, avatar } = profile;
  return (
    <div>
      <ProfileIcon nameInitial={name[0].toUpperCase()} avatar={avatar} />
    </div>
  );
};

export default CommentCard;
