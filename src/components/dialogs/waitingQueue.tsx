import { Loader } from "@components/loader";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/ui/alert-dialog";
import { useQueue } from "@hooks/useQueue";
import { useAuthStore } from "store/auth";
import { Button } from "../ui/button";

const WaitingQueueAlert: React.FC = () => {
  const { joinQueue, leaveQueue, isLoading } = useQueue();
  const { user } = useAuthStore();

  return (
    <AlertDialog open={!!user?.inQueueSince || user?.status === "AVAILABLE"}>
      <AlertDialogTrigger asChild>
        <Button
          className="h-10"
          loading={isLoading}
          onClick={joinQueue}
        >
          <p className="font-sans font-medium text-sm">
            Entrar na fila de espera
          </p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="items-center max-w-sm">
        <Loader />
        <AlertDialogHeader className="flex items-center">
          <AlertDialogTitle className="text-center">
            Aguardando consultor
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center max-w-xs">
            Você está na fila de espera, assim que um consultor estiver
            disponível você será direcionado para uma conferência.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="w-full bg-destructive hover:bg-destructive/90"
            onClick={leaveQueue}
            asChild
          >
            <Button
              variant="destructive"
              onClick={leaveQueue}
              loading={isLoading}
            >
              Sair da fila
            </Button>
            {/* <p className="font-sans font-medium text-sm text-white">
            </p> */}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WaitingQueueAlert;
