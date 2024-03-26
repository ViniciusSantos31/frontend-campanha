import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useRecovery } from "@hooks/useRecovery";
import {
  INewPasswordSchema,
  newPasswordResolver,
} from "@validations/recoveryPassword/newPassword";
import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { verifyCodeId } from "services/recoveryPassword";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

export const NewPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const { codeId } = useParams<{ codeId: string }>();
  const { isLoading, resetPassword } = useRecovery();
  const [isCodeValid, setIsCodeValid] = useState(true);

  const form = useForm<INewPasswordSchema>({
    resolver: newPasswordResolver,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  const verifyCode = useCallback(async () => {
    const isValid = await verifyCodeId(codeId ?? "");
    setIsCodeValid(isValid);
  }, [codeId]);

  useEffect(() => {
    verifyCode();
  }, [verifyCode]);

  if (!codeId || !isCodeValid) return <Navigate to="/recovery/request" />;

  return (
    <Form {...form}>
      <form
        id="form-signup"
        className="w-full flex flex-col items-start justify-center p-6 border rounded-md space-y-8 lg:w-1/2 bg-background xl:max-w-lg animate-slide-left"
        onSubmit={handleSubmit(() =>
          resetPassword({ password: form.getValues().new_password, codeId })
        )}
      >
        <div>
          <Button
            variant="outline"
            size="icon"
            className="mb-4"
            type="button"
            onClick={() => navigate("/recovery/request")}
          >
            <ArrowLeft />
          </Button>
          <div>
            <span className="text-2xl font-semibold mb-3">Nova senha</span>
            <p className="text-gray-500">
              Por favor, insira sua nova senha para continuar.
            </p>
          </div>
        </div>
        <div
          id="input-container"
          className="w-full flex flex-col items-end space-y-2"
        >
          <FormField
            control={control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="new_password"
                    label="Nova senha"
                    placeholder="Nova senha"
                    type="password"
                    autoFocus
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="password_confirmation"
                    label="Confirme sua nova senha"
                    placeholder="Confirme sua nova senha"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <footer className="w-full flex items-center justify-between">
          <Button
            className="w-full"
            disabled={!isValid}
            loading={isLoading}
            type="submit"
          >
            Criar nova senha
          </Button>
        </footer>
      </form>
    </Form>
  );
};
