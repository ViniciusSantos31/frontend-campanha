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
import { useCloseModal } from "@hooks/useCloseModal";
import { useTheme } from "@hooks/useTheme";
import { getFallbackAvatar } from "@utils/getFallbackAvatar";
import { Loading } from "App";
import { HelpCircle, LogOutIcon, Monitor, Moon, Sun, User } from "lucide-react";
import { Link } from "react-router-dom";
import EditProfile from "./dialogs/editProfile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const AvatarBadge: React.FC = () => {
  const { user } = useAuth();
  const { open, handleOpen } = useCloseModal();

  const fullName = user?.firstName + " " + user?.lastName;

  if (!user) return <Loading />;

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpen}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            data-testid="trigger-dropdown-menu-avatar-badge"
            className="w-auto group gap-3 flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-50 dark:hover:bg-accent transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-sans font-semibold">{fullName}</p>
              <p className="text-xs font-sans font-medium text-slate-400">
                {user?.userType === "PROVIDER" ? "Consultor" : "Solicitante"}
              </p>
            </div>
            <Avatar className="size-10">
              <AvatarImage
                data-testid="avatar-badge-image"
                src={user?.avatarUrl}
              />
              <AvatarFallback
                data-testid="avatar-badge-fallback"
                className="dark:group-hover:bg-zinc-700 group-hover:bg-zinc-200 transition-colors"
              >
                {user && getFallbackAvatar(user)}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownContent />
        <DropdownMenuPortal />
      </DropdownMenu>
      <DialogContent>
        <EditProfile />
      </DialogContent>
    </Dialog>
  );
};

const DropdownContent: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  const fullName = user?.firstName + " " + user?.lastName;

  const getIconTheme = () => {
    if (theme === "dark") {
      return <Moon size={16} />;
    } else if (theme === "system") {
      return <Monitor size={16} />;
    }
    return <Sun size={16} />;
  };

  return (
    <DropdownMenuContent className="min-w-40">
      <DropdownMenuLabel className="mr-8">{fullName}</DropdownMenuLabel>
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenuItem disabled>
              <HelpCircle size={16} />
              Suporte
            </DropdownMenuItem>
          </TooltipTrigger>
          <TooltipContent
            avoidCollisions
            align="center"
            alignOffset={10}
          >
            <p className="font-sans font-medium text-sm">Em breve</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link
          to="/"
          replace
          onClick={logout}
        >
          <LogOutIcon size={16} />
          <p>Sair</p>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
