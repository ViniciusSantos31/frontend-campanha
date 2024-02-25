import { Provider } from "@/types/provider";
import WaitingQueueAlert from "@components/dialogs/waitingQueue";
import { Header } from "@components/header";
import ListProviders from "@components/lists/providers";
import { useEffect, useState } from "react";

export const HomeRequester: React.FC = () => {
  const user: Provider = {
    id: "123",
    name: "Vinicius Silveira",
    avatar: "https://avatars.githubusercontent.com/u/41171735?v=4",
    email: "vncssnts31@gmail.com",
    doc: "CRM/PB 1234",
    status: "OFF",
  };

  const [users, setUsers] = useState<Provider[]>([]);

  const handleLoadUsers = () => {
    setTimeout(() => {
      setUsers([user, user, user, user]);
    }, 5000);
  };

  useEffect(() => {
    handleLoadUsers();
  }, []);

  return (
    <div className="w-screen flex flex-col items-center">
      <Header />
      <div
        id="body-container-requester"
        className="w-full flex items-center justify-center mt-2.5 py-2.5 px-2 sm:px-6 md:px-12 md:w-full"
      >
        <div
          id="body-content-requester"
          className="w-full flex flex-col justify-end items-end space-y-6 max-w-screen-xl px-4 lg:px-0"
        >
          <WaitingQueueAlert />
          <div
            id="list-providers"
            className="w-full space-y-4 overflow-hidden"
          >
            <h1 className="font-sans font-semibold text-xl animate-slide-left">
              Teleconsultores
            </h1>
            <ListProviders
              providers={[
                { ...user, status: "ON", id: "1" },
                { ...user, status: "WAITING", id: "2" },
                { ...user, status: "BUSY", id: "3" },
                user,
              ]}
              loading={users.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
