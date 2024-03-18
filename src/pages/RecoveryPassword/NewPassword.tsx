import { NewPasswordForm } from "@components/forms/NewPassword";
import { AuthLayout } from "layouts/Auth";

export const NewPassword: React.FC = () => {
  return (
    <AuthLayout>
      <NewPasswordForm />
    </AuthLayout>
  );
};
