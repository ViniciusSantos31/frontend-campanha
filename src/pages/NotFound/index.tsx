import { Button } from "@components/ui/button";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <div className="w-screen h-dvh px-6">
      <div className="flex flex-col space-y-4 items-center justify-center w-full h-full">
        <div className="flex animate-pulse">
          <h1 className="text-8xl animate-bounce delay-100">4</h1>
          <h1 className="text-8xl animate-bounce delay-200">0</h1>
          <h1 className="text-8xl animate-bounce">4</h1>
          <h1 className="text-8xl animate-bounce">!</h1>
        </div>
        <p className="text-sm lg:text-lg font-semibold text-center text-gray-800 dark:text-gray-100 z-10 max-w-80">
          Página não encontrada. Por favor, retorne ao início e tente novamente.
        </p>
        <Link
          to="/home"
          replace
        >
          <Button variant="outline">Voltar</Button>
        </Link>
      </div>
    </div>
  );
};
