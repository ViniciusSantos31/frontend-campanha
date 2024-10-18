import { LoginAsGuestForm } from "@components/forms/LoginAsGuest";
import { AuthLayout } from "layouts/Auth";

export const LoginAsGuest: React.FC = () => {
  return (
    <AuthLayout>
      <LoginAsGuestForm />
    </AuthLayout>
  );
};
