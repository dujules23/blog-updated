import Link from "next/link";
import { FC } from "react";
import Logo from "./Logo";
import { IconType } from "react-icons";

interface Props {
  navItems: { label: string; icon: IconType; href: string }[];
}

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  return (
    <nav className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark ">
      {/* Logo */}
      <Link href="/admin">
        <div className="flex items-center space-x-2 p-3 mb-3">
          <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />
          <span className="text-highlight-light dark:text-highlight-dark w-5 h-5 text-xl font-semibold mb-1">
            Admin
          </span>
        </div>
      </Link>

      {/* Nav Items */}

      <div className="space-y-6">
        {navItems.map((item) => {
          return (
            <Link key={item.href} href={item.href}>
              <div className="flex items-center text-highlight-light dark:text-highlight-dark  text-xl p-3 hover:scale-[0.98] transition">
                <item.icon size={24} />
                <span className="ml-2">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Nav Toggle (button) */}
    </nav>
  );
};

export default AdminNav;
