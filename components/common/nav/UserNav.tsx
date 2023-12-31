import { FC, useState } from "react";
import Logo from "../Logo";
import { HiLightBulb } from "react-icons/hi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { APP_NAME } from "../AppHead";
import Link from "next/link";
import { GitHubAuthButton } from "@/components/button";
import ProfileHead from "../ProfileHead";
import DropdownOptions, { dropDownOptions } from "../DropdownOptions";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { UserProfile } from "@/utils/types";
import useDarkMode from "@/hooks/useDarkMode";
import WelcomeModal from "../WelcomeModal";

interface Props {}

const defaultOptions: dropDownOptions = [
  {
    label: "Logout",
    async onClick() {
      await signOut();
    },
  },
];

const UserNav: FC<Props> = (props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data, status } = useSession();
  const isAuth = status === "authenticated";
  const profile = data?.user as UserProfile | undefined;
  const isAdmin = profile && profile.role === "admin";

  const { toggleTheme } = useDarkMode();

  const dropDownOptions: dropDownOptions = isAdmin
    ? [
        {
          label: "Dashboard",
          onClick() {
            router.push("/admin");
          },
        },
        ...defaultOptions,
      ]
    : defaultOptions;

  return (
    <div className="flex items-center justify-between bg-primary-dark p-4">
      {/* Logo and Title */}
      <Link href="/">
        <div className="flex items-center space-x-2 text-highlight-dark">
          <Logo className="fill-highlight-dark md:w-8 md:h-8 w-5 h-5" />
          <span className="md:text-xl font-semibold">{APP_NAME}</span>
        </div>
      </Link>
      {/* Dark Mode Button & Info Button */}
      <div className="flex items-center space-x-5">
        <button
          onClick={() => setIsOpen(true)}
          className="dark:text-secondary-dark text-secondary-light hover:text-yellow-200 dark:hover:text-yellow-200 transition ease-in-out"
        >
          <BsFillInfoCircleFill size={34} />
        </button>
        <button
          onClick={toggleTheme}
          className="dark:text-secondary-dark text-secondary-light"
        >
          <HiLightBulb size={34} />
        </button>

        {/* Info modal */}
        {isOpen && (
          <WelcomeModal
            title="Welcome to my Blog!"
            visible={isOpen}
            onClose={() => setIsOpen(false)}
            onCancel={() => setIsOpen(false)}
          />
        )}

        {isAuth ? (
          <DropdownOptions
            options={dropDownOptions}
            head={
              <ProfileHead
                nameInitial={profile?.name[0].toUpperCase()}
                avatar={profile?.avatar}
                lightOnly
              />
            }
          />
        ) : (
          <GitHubAuthButton lightOnly />
        )}
      </div>
    </div>
  );
};

export default UserNav;
