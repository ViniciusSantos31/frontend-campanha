import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  INewPasswordSchema,
  newPasswordResolver,
} from "@validations/recoveryPassword/newPassword";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

export const NewPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<INewPasswordSchema>({
    resolver: newPasswordResolver,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  const navigateToHome = () => {
    navigate("/recovery/confirm", {
      preventScrollReset: true,
      replace: true,
      unstable_viewTransition: true,
      relative: "path",
    });
  };

  return (
    <Form {...form}>
      <form
        id="form-signup"
        className="w-full flex flex-col items-start justify-center p-6 border rounded-md space-y-8 lg:w-1/2 bg-background xl:max-w-lg animate-slide-left"
        onSubmit={handleSubmit(navigateToHome)}
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
            type="submit"
          >
            Criar nova senha
          </Button>
        </footer>
      </form>
    </Form>
  );
};
