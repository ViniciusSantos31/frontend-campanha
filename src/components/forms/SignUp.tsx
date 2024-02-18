import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import getPasswordSecurity from "@/lib/password-security";

export const SignUpForm: React.FC = () => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const passwordSecurity = useMemo(() => {
    return getPasswordSecurity(password);
  }, [password]);

  return (
    <div
      id="form-signup"
      className="w-full flex flex-col items-start justify-center p-6 border rounded-md space-y-8 md:w-1/2 lg:w-1/3 xl:max-w-lg animate-slide-left transition-all"
    >
      <span className="text-2xl font-semibold">Cadastro</span>
      <div
        id="input-container"
        className="w-full flex flex-col items-end space-y-2"
      >
        <Input
          id="name"
          label="Nome completo"
          placeholder="Nome completo"
          type="text"
          className="w-full"
        />
        <Input
          id="doc"
          label="CPF"
          placeholder="CPF"
          type="text"
          className="w-full"
        />
        <Input
          id="email"
          label="E-mail"
          placeholder="E-mail"
          type="email"
          className="w-full"
        />
        <Input
          id="doc"
          label="CRM"
          placeholder="CRM"
          type="text"
          className="w-full"
        />
        <Input
          id="celular"
          label="Celular"
          placeholder="Celular"
          type="tel"
          className="w-full"
        />
        <Input
          id="password"
          label="Senha"
          placeholder="Senha"
          type="password"
          className="w-full"
          value={password}
          onChange={handlePasswordChange}
        />
        <Progress
          className="h-1"
          value={passwordSecurity}
        />
        <Input
          id="confirm-password"
          label="Confirme sua senha"
          placeholder="Senha"
          type="password"
          className="w-full"
        />
      </div>
      <footer className="w-full flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center font-sans text-sm underline cursor-pointer transition-colors font-medium hover:text-slate-600"
        >
          Entrar na plataforma
        </Link>
        <Button>Cadastrar</Button>
      </footer>
    </div>
  );
};
