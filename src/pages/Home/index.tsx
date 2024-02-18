import { Header } from "@/components/header";
import { Loader } from "@/components/loader";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CalendarX, Pause, RadioIcon, WifiOff } from "lucide-react";
import React, {
  ReactElement,
  cloneElement,
  useCallback,
  useEffect,
  useState,
} from "react";

type Provider = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  doc: string;
  status: "ON" | "OFF" | "WAITING" | "BUSY";
};

export const Home: React.FC = () => {
  const user: Provider = {
    id: "123",
    name: "Vinicius Silveira",
    avatar: "https://avatars.githubusercontent.com/u/41171735?v=4",
    email: "vncssnts31@gmail.com",
    doc: "CRM/PB 1234",
    status: "OFF",
  };

  const [users, setUsers] = useState<Provider[]>([]);

  const handleLoadUsers = useCallback(() => {
    setTimeout(() => {
      setUsers([user, user, user, user]);
    }, 5000);
  }, []);

  useEffect(() => {
    handleLoadUsers();
  }, [handleLoadUsers]);

  return (
    <div className="w-screen flex flex-col items-center">
      <Header />
      <body
        id="body-container-requester"
        className="w-full flex items-center justify-center mt-2.5 py-2.5 px-2 sm:px-6 md:px-12 md:w-full"
      >
        <div
          id="body-content-requester"
          className="w-full flex flex-col justify-end items-end space-y-6 max-w-screen-xl px-4 lg:px-0"
        >
          <AlertInQueue />
          <div
            id="list-providers"
            className="w-full space-y-4 overflow-hidden"
          >
            <h1 className="font-sans font-semibold text-xl animate-slide-left">
              Teleconsultores
            </h1>
            <ListProviders
              providers={[user, user]}
              loading={users.length === 0}
            />
          </div>
        </div>
      </body>
    </div>
  );
};

type ListProviderProps = {
  providers: Provider[];
  loading?: boolean;
};

const ListProviders: React.FC<ListProviderProps> = ({ providers, loading }) => {
  return (
    <ul className="w-full space-y-2.5 delay-75">
      {loading
        ? Array(3)
            .fill(undefined)
            .map(() => <Skeleton className="w-full h-28 md:h-24 delay-75" />)
        : providers.map((provider) => <Provider provider={provider} />)}
    </ul>
  );
};

type ProviderProps = {
  provider: Provider;
};

const Provider: React.FC<ProviderProps> = ({ provider }) => {
  return (
    <li className="flex flex-col items-start justify-center space-y-4 px-6 border py-6 rounded-md md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="flex space-x-2.5 md:flex-1">
        <Avatar>
          <AvatarImage src={provider.avatar} />
          <AvatarFallback>VS</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-sans font-medium text-sm">{provider.name}</p>
            <StatusBadge status={provider.status} />
          </div>
          <p className="font-sans font-medium text-xs text-slate-400">
            {provider.email}
          </p>
        </div>
      </div>
      <Separator className="md:hidden" />
      <div className="w-full flex items-center justify-between md:flex-1">
        <ProviderInfo
          label="Documento"
          value={provider.doc}
        />
        <StatusTag status={provider.status} />
      </div>
    </li>
  );
};

type ProviderInfoProps = {
  value: string;
  label: string;
};

const ProviderInfo: React.FC<ProviderInfoProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col text-left items-start justify-center">
      <p className="font-sans font-medium text-sm">{value}</p>
      <p className="font-sans font-medium text-xs text-slate-400">{label}</p>
    </div>
  );
};

interface StatusProps extends React.HTMLAttributes<HTMLDivElement> {
  status: "ON" | "OFF" | "WAITING" | "BUSY";
}

const getStyleByStatus = (status: "ON" | "OFF" | "WAITING" | "BUSY") => {
  switch (status) {
    case "ON":
      return {
        text: "text-emerald-800 dark:text-emerald-400",
        bg: "bg-emerald-200 dark:bg-emerald-900",
        fg: "bg-emerald-600",
      };
    case "OFF":
      return {
        text: "text-slate-800 dark:text-slate-400",
        bg: "bg-slate-200 dark:bg-slate-900 dark:border",
        fg: "bg-slate-600",
      };
    case "WAITING":
      return {
        text: "text-cyan-800 dark:text-cyan-400",
        bg: "bg-cyan-200 dark:bg-cyan-900 dark:border",
        fg: "bg-cyan-600",
      };
    case "BUSY":
      return {
        text: "text-red-800 dark:text-red-400",
        bg: "bg-red-200 dark:bg-red-900 dark:border",
        fg: "bg-red-600",
      };
  }
};

const getLabelByStatus = (status: "ON" | "OFF" | "WAITING" | "BUSY") => {
  switch (status) {
    case "ON":
      return "Disponível";
    case "OFF":
      return "Indisponível";
    case "WAITING":
      return "Pausado";
    case "BUSY":
      return "Ocupado";
  }
};

const icons: Record<StatusProps["status"], ReactElement> = {
  ON: <RadioIcon />,
  OFF: <WifiOff />,
  WAITING: <Pause />,
  BUSY: <CalendarX />,
};

const StatusBadge: React.FC<StatusProps> = ({ status, className, ...rest }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn("inline-block", className)}
            {...rest}
          >
            {cloneElement(icons[status], {
              size: 16,
              className: `${status === "ON" && "animate-pulse"} ${
                getStyleByStatus(status).text
              }`,
            })}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-sans font-medium text-sm">
            {getLabelByStatus(status)}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const StatusTag: React.FC<StatusProps> = ({ status, className, ...rest }) => {
  return (
    <div
      className={cn(
        `rounded-sm px-2.5 py-1 md:flex`,
        className,
        getStyleByStatus(status).bg
      )}
      {...rest}
    >
      <p
        className={cn(
          `flex items-center font-sans text-sm rounded-full font-medium select-none`,
          getStyleByStatus(status).text
        )}
      >
        {cloneElement(icons[status], {
          size: 14,
          className: `mr-1 ${status === "ON" && "animate-pulse"}`,
        })}
        {getLabelByStatus(status)}
      </p>
    </div>
  );
};

const AlertInQueue: React.FC = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="h-10">
          <p className="font-sans font-medium text-sm">
            Entrar na fila de espera
          </p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Aguardando consultor</AlertDialogTitle>
          <AlertDialogDescription>
            Você está na fila de espera, assim que um consultor estiver
            disponível você será direcionado para uma conferência.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Loader />
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-destructive hover:bg-destructive/90">
            <p className="font-sans font-medium text-sm text-white">
              Sair da fila
            </p>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
