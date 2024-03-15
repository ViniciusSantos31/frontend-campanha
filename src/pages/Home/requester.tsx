import { Provider } from "@/types/provider";
import WaitingQueueAlert from "@components/dialogs/waitingQueue";
import { Header } from "@components/header";
import ListProviders from "@components/lists/providers";
import { Button } from "@components/ui/button";
import { AlertOctagon, LibrarySquare, RefreshCcwIcon } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { list } from "services/providers";
import { queryClient } from "services/queryClient";

export const HomeRequester: React.FC = () => {
  const {
    data: providers,
    isLoading,
    isLoadingError,
  } = useQuery<Provider[] | null>(
    {
      queryKey: ["providers"],
      queryFn: list,
      staleTime: 1000 * 60 * 5, // 30 seconds
      refetchOnWindowFocus: false,
    },
    queryClient
  );

  return (
    <div className="w-screen h-dvh flex flex-col items-center">
      <Header />
      <div
        id="body-container-requester"
        className="w-full h-full flex items-center justify-center mt-2.5 pb-5 pt-2.5 px-2 sm:px-6 md:px-12 md:w-full"
      >
        <div
          id="body-content-requester"
          className="w-full h-full flex flex-col justify-end items-end space-y-6 max-w-screen-xl px-4 lg:px-0"
        >
          <WaitingQueueAlert />
          <div
            id="list-providers"
            className="flex flex-col justify-start w-full h-full max-h-svh"
          >
            <h1 className="flex items-center font-sans font-semibold mb-4 text-xl animate-slide-left">
              Teleconsultores
              {/* {isRefetching && <Loader2 className="ml-2 size-6 animate-spin" />} */}
            </h1>
            <ListProviders
              loading={isLoading}
              providers={providers ?? []}
            />
            {isLoadingError && <ErrorMessage />}
            {!isLoading && !isLoadingError && providers?.length === 0 && (
              <EmptyMessage />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-h-svh border rounded-md">
      <p className="flex flex-col items-center text-zinc-800 dark:text-zinc-200 text-center gap-2 leading-6 text-sm sm:max-w-sm">
        <LibrarySquare size={80} />
        Desculpe-nos, não encontramos consultores disponíveis no momento. Por
        favor, tente novamente mais tarde. Os consultores aparecerão aqui assim
        que estiverem disponíveis.
      </p>
    </div>
  );
};

const ErrorMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-h-svh border rounded-md animate-fade-in">
      <p className="flex flex-col items-center text-zinc-800 dark:text-zinc-200 text-center gap-2 leading-6 text-sm sm:max-w-xs">
        <AlertOctagon size={75} />
        Desculpe-nos, não foi possível buscar os consultores. Por favor, tente
        novamente.
      </p>
      <Button
        variant="outline"
        className="group mt-4"
        onClick={() =>
          queryClient.invalidateQueries({
            queryKey: ["providers"],
          })
        }
      >
        <RefreshCcwIcon
          size={15}
          className="group-hover:rotate-180 duration-500 transition-transform mr-2"
        />
        Tentar novamente
      </Button>
    </div>
  );
};
