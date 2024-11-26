import { Button } from "@components/ui/button";
import { Form, FormField } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useAuth } from "@hooks/useAuth";
import {
  ILoginAsGuestSchema,
  loginAsGuestResolver,
} from "@validations/loginAsGuest";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import socket from "services/socket";

export const LoginAsGuestForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  const form = useForm<ILoginAsGuestSchema>({
    resolver: loginAsGuestResolver,
    mode: "onChange",
    defaultValues: {
      firstName: searchParams.get("fn") || "",
      lastName: searchParams.get("ln") || "",
      qrCodeId: searchParams.get("qr") || undefined,
    },
  });

  const token = searchParams.get("qr");

  socket.emit("qr_code_accessed_on_page", token);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  const { user, isLoading, guestLogin } = useAuth();

  useEffect(() => {
    const firstName = searchParams.get("fn");
    const lastName = searchParams.get("ln");
    const qr = searchParams.get("qr") ?? undefined;

    if (firstName && lastName) {
      guestLogin({ firstName, lastName, qrCodeId: qr });
    }
  }, [searchParams, guestLogin]);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <Form {...form}>
      <form
        className="w-full max-w-[500px] p-10 border rounded-md"
        onSubmit={handleSubmit(guestLogin)}
      >
        <h1 className="text-2xl font-semibold mb-8">Entrar como convidado</h1>
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <Input
              {...field}
              label="Primeiro nome"
              className="mb-4"
            />
          )}
        />
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <Input
              {...field}
              label="Último nome"
            />
          )}
        />
        <footer className="flex justify-between mt-8">
          <Link
            to="/"
            replace
            className="flex items-center font-sans text-sm underline cursor-pointer transition-colors font-medium hover:text-gray-400"
          >
            Entrar com uma conta
          </Link>
          <Button
            type="submit"
            disabled={isLoading || !isValid}
          >
            Entrar
          </Button>
        </footer>
      </form>
    </Form>
  );
};
