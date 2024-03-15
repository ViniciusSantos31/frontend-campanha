import { useState } from "react";
import { queryClient } from "services/queryClient";
import { createRoom, releaseRoom } from "services/room";
import { toast } from "sonner";
import { useAuthStore } from "store/auth";

type AvailabilityReturn = {
  isLoading: boolean;
  handleCreateRoom: () => Promise<void>;
};

export const useAvailability = (): AvailabilityReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, saveUser } = useAuthStore();

  const handleCreateRoom = async () => {
    setIsLoading(true);
    try {
      if (user?.status === "AVAILABLE") {
        await releaseRoom();
        saveUser({ ...user, status: "OFFLINE" });
      } else {
        await createRoom();
        if (user) saveUser({ ...user, status: "AVAILABLE" });
      }
      queryClient.invalidateQueries({
        queryKey: ["providers"],
      });
    } catch {
      toast.error(
        "Não foi possível criar a sala. Tente novamente mais tarde.",
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
    handleCreateRoom,
  };
};
