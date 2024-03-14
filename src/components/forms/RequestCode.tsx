import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  IRequestCodeSchema,
  requestCodeResolver,
} from "@validations/recoveryPassword/requestCode";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

export const RequestCodeForm: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<IRequestCodeSchema>({
    resolver: requestCodeResolver,
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
            onClick={() => navigate("/")}
          >
            <ArrowLeft />
          </Button>
          <div>
            <span className="text-2xl font-semibold mb-3">Recuperar senha</span>
            <p className="text-gray-500">
              Insira o email cadastrado, e enviaremos um código para recuperação
              da senha.
            </p>
          </div>
        </div>
        <div
          id="input-container"
          className="w-full flex flex-col items-end space-y-2"
        >
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="email"
                    label="E-mail"
                    placeholder="E-mail"
                    autoFocus
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
            Enviar
          </Button>
        </footer>
      </form>
    </Form>
  );
};
