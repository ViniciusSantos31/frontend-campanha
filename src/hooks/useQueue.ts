import { useState } from "react";
import { joinQueue, leaveQueue } from "services/queue";
import socket from "services/socket";
import { toast } from "sonner";
import { useAuthStore } from "store/auth";

type QueueReturn = {
  isLoading: boolean;
  joinQueue: () => Promise<void>;
  leaveQueue: () => Promise<void>;
};

export const useQueue = (): QueueReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, saveUser } = useAuthStore();

  const handleJoinQueue = async () => {
    setIsLoading(true);
    try {
      await joinQueue();

      if (user)
        saveUser({ ...user, status: "AVAILABLE", inQueueSince: new Date() });

      socket.emit("new_user_in_queue");
    } catch {
      toast.error(
        "Não foi possível mudar a disponibilidade. Tente novamente mais tarde.",
        {
          description: "Se o erro persistir, entre em contato com o suporte.",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeaveQueue = async () => {
    setIsLoading(true);
    try {
      await leaveQueue();
      if (user) {
        saveUser({ ...user, status: "OFFLINE", inQueueSince: null });
      }
    } catch {
      toast.error(
        "Não foi possível sair da fila. Tente novamente mais tarde.",
        {
          description: "Se o erro persistir, entre em contato com o suporte.",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    joinQueue: handleJoinQueue,
    leaveQueue: handleLeaveQueue,
  };
};
