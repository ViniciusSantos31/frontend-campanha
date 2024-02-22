import { ProconLogo } from "@/assets/procon-logo";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils";
import { HelpCircle, LogOutIcon, Monitor, Moon, Sun, User } from "lucide-react";
import { Link } from "react-router-dom";
import EditProfile from "./dialogs/editProfile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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

const AvatarBadge: React.FC = () => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-auto gap-3 flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-50 dark:hover:bg-accent">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-sans font-semibold">
                Vinicius Silveira
              </p>
              <p className="text-xs font-sans font-medium text-slate-400">
                Solicitante
              </p>
            </div>
            <Avatar className="size-10">
              <AvatarImage src="https://avatars.githubusercontent.com/u/41171735?v=4" />
              <AvatarFallback>VS</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownContent />
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <EditProfile />
      </DialogContent>
    </Dialog>
  );
};

const DropdownContent: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const getIconTheme = () => {
    if (theme === "dark") {
      return <Moon size={16} />;
    } else if (theme === "system") {
      return <Monitor size={16} />;
    }
    return <Sun size={16} />;
  };

  return (
    <>
      <DropdownMenuLabel className="mr-8">
        Vinícius dos Santos
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DialogTrigger asChild>
        <DropdownMenuItem>
          <User size={16} />
          Editar perfil
        </DropdownMenuItem>
      </DialogTrigger>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <div className="flex items-center gap-2">
            {getIconTheme()}
            <p>Tema</p>
          </div>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuCheckboxItem
              checked={theme === "system"}
              onClick={() => setTheme("system")}
            >
              Sistema
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={theme === "light"}
              onClick={() => setTheme("light")}
            >
              Claro
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={theme === "dark"}
              onClick={() => setTheme("dark")}
            >
              Escuro
            </DropdownMenuCheckboxItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <HelpCircle size={16} />
        Suporte
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link
          to="/"
          replace
        >
          <LogOutIcon size={16} />
          <p>Sair</p>
        </Link>
      </DropdownMenuItem>
    </>
  );
};

const LogoHeader: React.FC = () => {
  return (
    <Link to="/">
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
