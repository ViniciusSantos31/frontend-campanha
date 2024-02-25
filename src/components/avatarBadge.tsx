import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
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
} from "@components/ui/dropdown-menu";
import { useAuth } from "@hooks/useAuth";
import { useTheme } from "@hooks/useTheme";
import { HelpCircle, LogOutIcon, Monitor, Moon, Sun, User } from "lucide-react";
import { Link } from "react-router-dom";
import EditProfile from "./dialogs/editProfile";

export const AvatarBadge: React.FC = () => {
  const { user } = useAuth();

  const getFallbackAvatar = () => {
    const [firstName, lastName] = user?.name.split(" ") || ["", ""];

    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          data-testid="trigger-dropdown-menu-avatar-badge"
          asChild
        >
          <button className="w-auto gap-3 flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-50 dark:hover:bg-accent">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-sans font-semibold">{user?.name}</p>
              <p className="text-xs font-sans font-medium text-slate-400">
                {user?.role === "PROVIDER" ? "Consultor" : "Solicitante"}
              </p>
            </div>
            <Avatar className="size-10">
              <AvatarImage
                data-testid="avatar-badge-image"
                src={user?.avatar}
              />
              <AvatarFallback data-testid="avatar-badge-fallback">
                {getFallbackAvatar()}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-40">
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
  const { user } = useAuth();

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
      <DropdownMenuLabel
        data-testid="dropdown-menu-content-avatar-badge"
        className="mr-8"
      >
        {user?.name}
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
