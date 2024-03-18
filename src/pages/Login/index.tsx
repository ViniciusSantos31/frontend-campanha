import { LoginForm } from "@components/forms/Login";
import { AuthLayout } from "layouts/Auth";

export const Login: React.FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
