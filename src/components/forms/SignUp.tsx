import getPasswordSecurity from "@/lib/password-security";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";

const signUpSchema = z.object({
  name: z
    .string({
      required_error: "O nome é obrigatório",
    })
    .min(3, "O nome deve ter no mínimo 3 caracteres"),
  personal_doc: z
    .string({
      required_error: "O CPF é obrigatório",
    })
    .min(11, "O CPF deve ter 11 caracteres")
    .refine((value) => isFinite(Number(value)), {
      message: "O CPF deve ser composto apenas por números",
    }),
  professional_doc: z
    .string({
      required_error: "O CRM é obrigatório",
    })
    .min(7, "O CRM deve ter 7 caracteres"),
  phone: z
    .string({
      required_error: "O celular é obrigatório",
    })
    .min(11, "O celular deve ter 11 caracteres"),
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
  password_confirmation: z
    .string({
      required_error: "A confirmação de senha é obrigatória",
    })
    .min(6, "A confirmação de senha deve ter no mínimo 6 caracteres"),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export const SignUpForm: React.FC = () => {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = form;
  const password = watch("password");

  const handleCreateUser = (data: SignUpSchema) => {
    console.log("data", data);
  };

  const passwordSecurity = useMemo(() => {
    return getPasswordSecurity(password ?? "");
  }, [password]);

  return (
    <Form {...form}>
      <form
        id="form-signup"
        className="w-full flex flex-col items-start justify-center p-6 border rounded-md space-y-8 md:w-full lg:w-1/2 xl:max-w-lg animate-slide-left transition-all"
        onSubmit={handleSubmit(handleCreateUser, (data) => console.log(data))}
      >
        <span className="text-2xl font-semibold">Cadastro</span>
        <div
          id="input-container"
          className="w-full flex flex-col items-end space-y-2"
        >
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="name"
                    label="Nome completo"
                    placeholder="Nome completo"
                    type="text"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="personal_doc"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="personal_doc"
                    label="CPF"
                    placeholder="CPF"
                    type="text"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    type="email"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="professional_doc"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="professional_doc"
                    label="CRM"
                    placeholder="CRM"
                    type="text"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="celular"
                    label="Celular"
                    placeholder="Celular"
                    type="tel"
                    className="w-full"
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
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Progress
            className="h-1"
            value={passwordSecurity}
          />
          <FormField
            control={control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="password_confirmation"
                    label="Confirme sua senha"
                    placeholder="Senha"
                    type="password"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <footer className="w-full flex items-center justify-between">
          <Link
            to="/login"
            replace
            className="flex items-center font-sans text-sm underline cursor-pointer transition-colors font-medium hover:text-slate-600"
          >
            Entrar na plataforma
          </Link>
          <Button disabled={!isValid}>Cadastrar</Button>
        </footer>
      </form>
    </Form>
  );
};
