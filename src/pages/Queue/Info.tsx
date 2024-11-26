import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUserByQRCode, InfoUser } from "services/qrCode";

export const QueuePageInfo: React.FC = () => {

  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();

  const qrCodeId = searchParams.get("qr") ?? undefined;

  const { data, isLoading } = useQuery({
    queryKey: ["queue", qrCodeId],
    queryFn: () => getUserByQRCode(qrCodeId),
    enabled: !!qrCodeId,
  });

  const statusMap: Record<InfoUser["status"], string> = {
    AVAILABLE: "Na fila",
    OFFLINE: "Offline",
  }

  if (!qrCodeId) {
    navigate("/queue");
    return;
  }

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <div className="queue-page flex flex-col w-full h-full items-center justify-center space-y-8">
      <section className="flex flex-col items-start w-full max-w-screen-sm">
        <span className="text-gray-500">Usuário</span>
        <p className="text-2xl font-bold">
          {data?.firstName} {data?.lastName}
        </p>
      </section>
      {data?.status === "AVAILABLE" ? (
        <div className="flex w-full max-w-screen-sm items-center justify-start space-x-10">
          <section className="flex flex-col items-start space-y-4 text-start">
            <span className="text-gray-500">Sua posição na fila</span>
            <p className="text-2xl font-bold">{data?.positionOnQueue}</p>
          </section>
          <section className="flex flex-col items-start space-y-4 text-start">
            <span className="text-gray-500">Status</span>
            <p className="text-2xl font-bold">
              {statusMap[data?.status ?? "OFFLINE"]}
            </p>
          </section>
          <section className="flex flex-col items-start space-y-4 text-start">
            <span className="text-gray-500">Consultores disponíveis</span>
            <p className="text-2xl font-bold">{data?.providersInQueue}</p>
          </section>
        </div>
      ) : (
        <section className="flex flex-col items-start space-y-4 text-start">
          <span className="text-gray-500">
            Você não está na fila de espera!
          </span>
        </section>
      )}
    </div>
  );
}