import { SignUpForm } from "@components/forms/SignUp";
import { AuthLayout } from "layouts/Auth";

export const SignUp: React.FC = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};
