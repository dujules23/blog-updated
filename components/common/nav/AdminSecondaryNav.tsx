import { NextPage } from "next";
import DropdownOptions, { dropDownOptions } from "../DropdownOptions";
import ProfileHead from "../ProfileHead";
import { useRouter } from "next/router";
import useDarkMode from "@/hooks/useDarkMode";
import { signOut, useSession } from "next-auth/react";
import SearchBar from "../SearchBar";
import { UserProfile } from "@/utils/types";

interface Props {}

const AdminSecondaryNav: NextPage<Props> = () => {
  const { data } = useSession();
  const profile = data?.user as UserProfile | undefined;
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

  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return;

    // search
    router.push("/admin/search?title=" + query);
  };

  return (
    <div className="flex items-center justify-between">
      {/* search bar */}
      <SearchBar onSubmit={handleSearchSubmit} />
      {/* options/ profile head */}
      <DropdownOptions
        head={
          <ProfileHead
            nameInitial={profile?.name[0].toUpperCase()}
            avatar={profile?.avatar}
          />
        }
        options={options}
      />
    </div>
  );
};

export default AdminSecondaryNav;
