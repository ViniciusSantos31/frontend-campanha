import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { cn } from "@utils/cn";
import { CalendarX, Pause, RadioIcon, WifiOff } from "lucide-react";
import { ReactElement, cloneElement } from "react";

interface StatusProps extends React.HTMLAttributes<HTMLDivElement> {
  status: "AVAILABLE" | "OFFLINE" | "PAUSED" | "BUSY";
}

const getStyleByStatus = (
  status: "AVAILABLE" | "OFFLINE" | "PAUSED" | "BUSY"
) => {
  switch (status) {
    case "AVAILABLE":
      return {
        text: "text-emerald-800 dark:text-emerald-400",
        bg: "bg-emerald-200 dark:bg-emerald-900",
        fg: "bg-emerald-600",
      };
    case "OFFLINE":
      return {
        text: "text-slate-800 dark:text-slate-400",
        bg: "bg-slate-200 dark:bg-slate-900 dark:border",
        fg: "bg-slate-600",
      };
    case "PAUSED":
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

const getLabelByStatus = (
  status: "AVAILABLE" | "OFFLINE" | "PAUSED" | "BUSY"
) => {
  switch (status) {
    case "AVAILABLE":
      return "Disponível";
    case "OFFLINE":
      return "Indisponível";
    case "PAUSED":
      return "Pausado";
    case "BUSY":
      return "Ocupado";
  }
};

const icons: Record<StatusProps["status"], ReactElement> = {
  AVAILABLE: <RadioIcon data-testid="status-on-icon" />,
  OFFLINE: <WifiOff data-testid="status-off-icon" />,
  PAUSED: <Pause data-testid="status-waiting-icon" />,
  BUSY: <CalendarX data-testid="status-busy-icon" />,
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
              className: `${status === "AVAILABLE" && "animate-pulse"} ${
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
          className: `mr-1 ${status === "AVAILABLE" && "animate-pulse"}`,
        })}
        {getLabelByStatus(status)}
      </p>
    </div>
  );
};

export { StatusBadge, StatusTag };
