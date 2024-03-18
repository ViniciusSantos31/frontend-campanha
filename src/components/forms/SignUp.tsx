import { getPasswordSecurity } from "@utils/password-security";
import { ISignUpSchema, signUpResolver } from "@validations/register";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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

import { useHookFormMask } from "use-mask-input";
import { Options as MaskOptions } from "use-mask-input/src/inputmask.types";

const maskOptions: MaskOptions = {
  showMaskOnHover: false,
  showMaskOnFocus: false,
  removeMaskOnSubmit: true,
  unmaskAsNumber: true,
  autoUnmask: true,
};

export const SignUpForm: React.FC = () => {
  const form = useForm<ISignUpSchema>({
    resolver: signUpResolver,
    mode: "onChange",
    defaultValues: {
      phone: "82088717",
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
    register,
  } = form;

  const registerWithMask = useHookFormMask(register);

  const password = watch("password");

  const handleCreateUser = (data: ISignUpSchema) => {
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
                    {...registerWithMask(
                      "personal_doc",
                      ["999.999.999-99", "99.999.999/9999-99"],
                      maskOptions
                    )}
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
                    {...registerWithMask(
                      "phone",
                      [
                        "9999-9999",
                        "99999-9999",
                        "9 9999-9999",
                        "(99) 9999-9999",
                        "(99) 99999-9999",
                      ],
                      maskOptions
                    )}
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
            to="/"
            replace
            className="flex items-center font-sans text-sm underline cursor-pointer transition-colors font-medium hover:text-gray-400"
          >
            Entrar na plataforma
          </Link>
          <Button disabled={!isValid}>Cadastrar</Button>
        </footer>
      </form>
    </Form>
  );
};
