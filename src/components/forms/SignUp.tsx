import { getPasswordSecurity } from "@utils/password-security";
import { ISignUpSchema, signUpResolver } from "@validations/register";
import { useEffect, useMemo } from "react";
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

import { useRegister } from "@hooks/useRegister";
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
    context: "signup",
    mode: "onChange",
    resetOptions: {
      keepValues: false,
    },
  });

  const { isLoading, register: registerUser } = useRegister();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, errors },
    register,
  } = form;

  const registerWithMask = useHookFormMask(register);

  const password = watch("password");

  const passwordSecurity = useMemo(() => {
    return getPasswordSecurity(password ?? "");
  }, [password]);

  useEffect(() => {
    console.log(isValid, errors);
  }, [isValid, errors]);

  return (
    <Form {...form}>
      <form
        id="form-signup"
        className="w-full h-full mb-10 lg:h-auto lg:mb-1 flex flex-col justify-between p-6 border rounded-md space-y-8 md:w-full lg:w-1/2 xl:max-w-lg animate-slide-left transition-all"
        onSubmit={handleSubmit(registerUser, (data) => console.log(data))}
      >
        <span className="text-2xl font-semibold">Cadastro</span>
        <div
          id="input-container"
          className="w-full flex flex-col items-end space-y-2"
        >
          <div className="w-full flex flex-col items-start justify-center gap-4 lg:flex-row">
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="firstName"
                      label="Primeiro nome"
                      placeholder="Primeiro nome"
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="lastName"
                      label="Último nome"
                      placeholder="Último nome"
                      type="text"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="cpf"
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
                      "cpf",
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
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="passwordConfirmation"
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
          <Button
            disabled={!isValid}
            loading={isLoading}
          >
            Cadastrar
          </Button>
        </footer>
      </form>
    </Form>
  );
};
