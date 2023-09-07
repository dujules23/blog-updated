import { GitHubAuthButton } from "@/components/button";
import { NextPage } from "next";

interface Props {}

const SignIn: NextPage<Props> = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary dark:bg-primary-dark">
      <GitHubAuthButton />
    </div>
  );
};

export default SignIn;
