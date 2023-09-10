import { NextPage } from "next";
import DropdownOptions, { dropDownOptions } from "../DropdownOptions";
import ProfileHead from "../ProfileHead";
import { useRouter } from "next/router";
import useDarkMode from "@/hooks/useDarkMode";
import { signOut } from "next-auth/react";

interface Props {}

const AdminSecondaryNav: NextPage<Props> = () => {
  const router = useRouter();
  const { toggleTheme } = useDarkMode();
  const navigateToCreateNewPost = () => router.push("/admin/posts/create");
  const handleLogOut = async () => await signOut();

  const options: dropDownOptions = [
    {
      label: "Add new post",
      onClick: navigateToCreateNewPost,
    },
    {
      label: "Change theme",
      onClick: toggleTheme,
    },
    {
      label: "Log out",
      onClick: handleLogOut,
    },
  ];

  return (
    <div className="flex items-center justify-between">
      {/* search bar */}
      <input type="text" />
      {/* options/ profile head */}
      <DropdownOptions
        head={<ProfileHead nameInitial="D" />}
        options={options}
      />
    </div>
  );
};

export default AdminSecondaryNav;
