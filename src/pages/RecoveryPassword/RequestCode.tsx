import { RequestCodeForm } from "@components/forms/RequestCode";
import { AuthLayout } from "layouts/Auth";

export const RequestCode: React.FC = () => {
  return (
    <AuthLayout>
      <RequestCodeForm />
    </AuthLayout>
  );
};
