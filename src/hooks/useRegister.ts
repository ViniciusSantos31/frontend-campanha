import { ISignUpSchema } from "@validations/register";
import { useState } from "react";
import { registerUser } from "services/auth";

type RegisterReturn = {
  isLoading: boolean;
  register: (data: ISignUpSchema) => void;
};

export const useRegister = (): RegisterReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data: ISignUpSchema) => {
    setIsLoading(true);
    try {
      const { passwordConfirmation: _, ...rest } = data;
      await registerUser({ ...rest });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    register: handleRegister,
  };
};
