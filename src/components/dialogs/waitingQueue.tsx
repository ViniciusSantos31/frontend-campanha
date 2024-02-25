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
import { Button } from "../ui/button";

const WaitingQueueAlert: React.FC = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="h-10">
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
          <AlertDialogCancel className="w-full bg-destructive hover:bg-destructive/90">
            <p className="font-sans font-medium text-sm text-white">
              Sair da fila
            </p>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WaitingQueueAlert;
