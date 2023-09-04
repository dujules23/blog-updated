import { FC } from "react";
import Logo from "../Logo";
import { HiLightBulb } from "react-icons/hi";
import { APP_NAME } from "../AppHead";
import Link from "next/link";
import { GitHubAuthButton } from "@/components/button";
import ProfileHead from "../ProfileHead";
import DropdownOptions, { dropDownOptions } from "../DropdownOptions";

interface Props {}

const UserNav: FC<Props> = (props): JSX.Element => {
  const dropDownOptions: dropDownOptions = [
    { label: "Dashboard", onClick() {} },
    { label: "Logout", onClick() {} },
  ];

  return (
    <div className="flex items-center justify-between bg-primary-dark p-3">
      {/* Logo and Title */}
      <Link href="/">
        <div className="flex space-x-2 text-highlight-dark">
          <Logo className="fill-highlight-dark" />
          <span className="text-xl font-semibold">{APP_NAME}</span>
        </div>
      </Link>
      {/* Dark Mode Button */}
      <div className="flex items-center space-x-5">
        <button className="dark:text-secondary-dark text-secondary-light">
          <HiLightBulb size={34} />
        </button>

        {/* <GitHubAuthButton lightOnly /> */}

        <DropdownOptions
          options={dropDownOptions}
          head={<ProfileHead nameInitial="D" lightOnly />}
        />
      </div>
    </div>
  );
};

export default UserNav;
