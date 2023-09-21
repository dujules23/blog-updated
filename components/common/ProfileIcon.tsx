import classNames from "classnames";
import { FC, useCallback } from "react";
import Image from "next/image";

interface Props {
  lightOnly?: boolean;
  avatar?: string;
  nameInitial?: string;
}

const commonClasses =
  "relative flex items-center justify-center rounded-full overflow-hidden w-8 h-8 select-none";

const ProfileIcon: FC<Props> = ({
  avatar,
  nameInitial,
  lightOnly,
}): JSX.Element => {
  // getStyle function that renders conditional styles, maybe turned into a component
  const getStyle = useCallback(() => {
    if (lightOnly) return "text-primary-dark bg-primary";
    return "bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary";
  }, [lightOnly]);
  return (
    <div className={classNames(commonClasses, getStyle())}>
      {avatar ? (
        <Image src={avatar} layout="fill" alt="profile" />
      ) : (
        nameInitial
      )}
    </div>
  );
};

export default ProfileIcon;
