import classNames from "classnames";
import { FC, useCallback } from "react";
import { AiFillGithub } from "react-icons/ai";

interface Props {
  lightOnly?: boolean;
  onClick?(): void;
}

const commonClasses =
  "flex items-center justify-center space-x-1 px-3 py-2 rounded hover:scale-[0.97] transition duration-100";

export const GitHubAuthButton: FC<Props> = ({
  lightOnly,
  onClick,
}): JSX.Element => {
  // conditionally renders styles needed, then use classNames to apply the correct styles
  const getStyle = useCallback(() => {
    if (lightOnly) return "text-primary-dark bg-primary";
    return "bg-primary-dark dark:bg-primary dark:text-primary dark text primary";
  }, [lightOnly]);

  return (
    <button onClick={onClick} className={classNames(commonClasses, getStyle())}>
      <span>Continue with</span>
      <AiFillGithub size={24} />
    </button>
  );
};
