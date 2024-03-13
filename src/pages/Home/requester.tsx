import WaitingQueueAlert from "@components/dialogs/waitingQueue";
import { Header } from "@components/header";
import ListProviders from "@components/lists/providers";

export const HomeRequester: React.FC = () => {
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
                {
                  id: "1",
                  avatar:
                    "https://avatars.githubusercontent.com/u/41171735?v=4",
                  name: "John Doe",
                  doc: "12345678900",
                  status: "ON",
                  email: "oi@email.com",
                },
                {
                  id: "1",
                  avatar:
                    "https://avatars.githubusercontent.com/u/41171735?v=4",
                  name: "John Doe",
                  doc: "12345678900",
                  status: "OFF",
                  email: "oi@email.com",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
