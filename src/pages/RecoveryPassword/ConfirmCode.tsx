import { ConfirmCodeForm } from "@components/forms/ConfirmCode";
import { AuthLayout } from "layouts/Auth";

export const ConfirmCode: React.FC = () => {
  return (
    <AuthLayout>
      <ConfirmCodeForm />
    </AuthLayout>
  );
};
