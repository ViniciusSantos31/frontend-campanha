import { cn } from "@utils/cn";
import { Link } from "react-router-dom";
import { AvatarBadge } from "./avatarBadge";

import LogoSUS from "@assets/Logo_SUS.png";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Header: React.FC<HeaderProps> = ({ className, ...rest }) => {
  return (
    <header
      className={cn(
        "w-full flex items-center justify-center py-2.5 px-2 border-b border-slate-300 sm:px-6 md:px-12 dark:border-slate-700 sticky top-0 bg-white dark:bg-card z-10",
        className
      )}
      {...rest}
    >
      <div
        id="header-content"
        className="w-full max-w-screen-xl flex items-center justify-between px-4 md:px-0 md:w-full"
      >
        <LogoHeader />
        <AvatarBadge />
      </div>
    </header>
  );
};

const LogoHeader: React.FC = () => {
  return (
    <Link to="/home">
      <aside
        id="logo"
        className="flex items-center"
      >
        <p className="font-sans text-lg text-secondary-foreground mr-3">
          Plantão
        </p>
        <img
          src={LogoSUS}
          alt="Logo"
          className="h-10 aspect-auto"
        />
      </aside>
    </Link>
  );
};
