import { useState } from "react";
import { toggleStatus } from "services/providers";
import { queryClient } from "services/queryClient";
import { createConference } from "services/room";
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
      await toggleStatus();

      if (user?.status === "AVAILABLE") {
        saveUser({ ...user, status: "PAUSED" });
      } else {
        if (user) saveUser({ ...user, status: "AVAILABLE" });
      }
      queryClient.invalidateQueries({
        queryKey: ["providers"],
      });

      if (user?.userType === "PROVIDER" && user?.status === "PAUSED")
        await createConference().catch(() => {});
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

  return {
    isLoading,
    handleCreateRoom,
  };
};
