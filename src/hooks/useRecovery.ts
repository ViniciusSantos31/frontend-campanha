import { useState } from "react";
import {
  confirmCode,
  requestCode,
  resetPassword,
} from "services/recoveryPassword";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";

type RecoveryReturn = {
  requestCode: (email: string) => void;
  resetPassword: (data: { password: string; codeId: string }) => void;
  validateCode: (code: number, id: string) => void;
  isLoading: boolean;
};

export function useRecovery(): RecoveryReturn {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRequestCode(email: string) {
    setIsLoading(true);
    try {
      const id = await requestCode(email);
      navigate(`/recovery/confirm/${id}`);
      return id;
    } catch {
      throw new Error("Não foi possível enviar o código de recuperação.");
    } finally {
      setIsLoading(false);
    }
  }

  async function validateCode(code: number, id: string) {
    setIsLoading(true);
    try {
      await confirmCode({ id, code });
      navigate(`/recovery/password/${id}`);
    } catch (error) {
      toast.error("Código de recuperação inválido.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPassword(data: {
    password: string;
    codeId: string;
  }) {
    setIsLoading(true);
    try {
      await resetPassword(data);
      navigate("/");
    } catch (error) {
      toast.error("Não foi possível redefinir sua senha.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    requestCode: handleRequestCode,
    resetPassword: handleResetPassword,
    validateCode,
    isLoading,
  };
}
