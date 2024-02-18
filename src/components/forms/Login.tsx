import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const LoginForm: React.FC = () => {
  return (
    <div
      id="form-signup"
      className="w-full flex flex-col items-start           justify-center p-6 border rounded-md space-y-8 md:w-1/2 lg:w-1/3 bg-background xl:max-w-lg animate-slide-right"
    >
      <span className="text-2xl font-semibold">Entrar</span>
      <div
        id="input-container"
        className="w-full flex flex-col items-end space-y-2"
      >
        <Input
          id="email"
          label="E-mail"
          placeholder="E-mail"
          type="email"
          className="w-full"
        />
        <Input
          id="password"
          label="Senha"
          placeholder="Senha"
          type="password"
          className="w-full"
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
          className="flex items-center font-sans text-sm underline cursor-pointer transition-colors font-medium hover:text-slate-600"
        >
          Cadastre-se
        </Link>
        <Button>Entrar</Button>
      </footer>
    </div>
  );
};
