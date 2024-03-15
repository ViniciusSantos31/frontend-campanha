import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useAuth } from "@hooks/useAuth";
import { ILoginSchema, loginResolver } from "@validations/login";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<ILoginSchema>({
    resolver: loginResolver,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  const { user, isLoading, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <Form {...form}>
      <form
        id="form-signup"
        className="w-full flex flex-col items-start justify-center p-6 border rounded-md space-y-8 lg:w-1/2 bg-background xl:max-w-lg animate-slide-right"
        onSubmit={handleSubmit(login)}
      >
        <span className="text-2xl font-semibold">Entrar</span>
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

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="password"
                    label="Senha"
                    placeholder="Senha"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link to="/recovery/request">
            <Label
              htmlFor="remember-me"
              className="flex items-center font-sans text-sm underline cursor-pointer transition-colors font-medium hover:text-gray-400"
            >
              Esqueceu sua senha?
            </Label>
          </Link>
        </div>
        <footer className="w-full flex items-center justify-between">
          <Link
            to="/signup"
            replace
            className="flex items-center font-sans text-sm underline cursor-pointer transition-colors font-medium hover:text-gray-400"
          >
            Cadastre-se
          </Link>
          <Button
            disabled={!isValid}
            loading={isLoading}
            type="submit"
          >
            Entrar
          </Button>
        </footer>
      </form>
    </Form>
  );
};
