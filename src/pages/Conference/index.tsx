import { Loading } from "App";
import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { closeConference } from "services/room";
import { toast } from "sonner";
import { useAuthStore } from "store/auth";
import WiseAPI from "wise-api";

export const Conference: React.FC = () => {
  const { short } = useParams<{ short: string }>();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [conferenceIsLoaded, setConferenceIsLoaded] = useState(false);

  const isProvider = user?.userType === "PROVIDER";

  const startConference = useCallback(async () => {
    const wise = await WiseAPI({
      baseUrl: "https://session-manager.dev.v4h.cloud/api/v1",
      domain: "conf.dev.v4h.cloud",
    });

    await wise.session
      .startConference(short ?? "", {
        parentNode: document.getElementById("conference"),
        onLoad: () => {
          console.log("Conference loaded");
          setConferenceIsLoaded(true);
        },
        moderator: isProvider,
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        onClose: () => {
          navigate("/home");
          if (isProvider) {
            closeConference(short ?? "");
          }
        },
        onParticipantLeft: () => {
          toast.info(`Um participante saiu da sala.`, {
            duration: 5000,
            description: "A sala será fechada em 5 segundos",
            onAutoClose: () => {
              navigate("/home");
              if (isProvider) {
                closeConference(short ?? "");
              }
            },
          });
        },
        buttons: [
          "microphone",
          "camera",
          "desktop",
          "fullscreen",
          "hangup",
          "profile",
          "chat",
          "settings",
          "raisehand",
          "videoquality",
          "filmstrip",
          "stats",
          "tileview",
          "help",
          "libras",
        ],
        userInfo: {
          displayName: user?.firstName + " " + user?.lastName,
          email: user?.email,
          avatarUrl: user?.avatarUrl || "",
        },
      })
      .catch((error) => {
        navigate("/404");
        return Promise.reject(error);
      });
  }, []);

  useEffect(() => {
    startConference();
  }, [startConference]);

  if (!short) return <Navigate to="/home" />;

  return (
    <div
      className="h-dvh w-screen overflow-x-hidden"
      id="conference"
    >
      {!conferenceIsLoaded && <Loading />}
    </div>
  );
};
