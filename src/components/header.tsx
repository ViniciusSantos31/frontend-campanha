import { ProconLogo } from "@assets/procon-logo";
import { cn } from "@utils/cn";
import { Link } from "react-router-dom";
import { AvatarBadge } from "./avatarBadge";

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
      <div
        id="logo-header"
        className="flex items-center justify-center space-x-2 cursor-pointer transition-colors hover:text-slate-500"
      >
        <p className="font-sans text-sm">Plantão</p>
        <ProconLogo width="80" />
      </div>
    </Link>
  );
};
