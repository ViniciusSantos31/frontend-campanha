import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "O e-mail é obrigatório",
      invalid_type_error: "Insira um e-mail válido",
    })
    .email("Insira um e-mail válido"),
  password: z
    .string({
      required_error: "A senha é obrigatória",
    })
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleLogin = (data: LoginSchema) => {
    try {
      console.log("data", data);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigateToHome();
      }, 5000);
    } catch (error) {
      setLoading(false);
    }
  };

  const navigateToHome = () => {
    navigate("/", {
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
        className="w-full flex flex-col items-start justify-center p-6 border rounded-md space-y-8 md:w-1/2 lg:w-1/3 bg-background xl:max-w-lg animate-slide-right"
        onSubmit={handleSubmit(handleLogin)}
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
          <Label
            htmlFor="remember-me"
            className="flex items-center font-sans text-sm underline cursor-pointer transition-colors font-medium hover:text-slate-600"
          >
            Esqueceu sua senha?
          </Label>
        </div>
        <footer className="w-full flex items-center justify-between">
          <Link
            to="/signup"
            replace
            className="flex items-center font-sans text-sm underline cursor-pointer transition-colors font-medium hover:text-slate-600"
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
