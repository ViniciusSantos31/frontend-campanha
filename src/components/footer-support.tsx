import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";

export const FooterSupport: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  return (
    <footer
      className={cn(
        "w-full flex items-center justify-between p-5 border-t bg-card space-x-4 md:justify-center",
        className
      )}
      {...rest}
    >
      <Link
        to="mailto:vncssnts31@gmail.com"
        className="flex items-center text-right font-sans text-sm font-medium underline cursor-pointer transition-colors hover:text-slate-600"
      >
        Dúvidas? Fale conosco.
      </Link>
      <Separator
        orientation="vertical"
        className="hidden sm:block"
      />
      <Label
        htmlFor="remember-me"
        className="flex items-center font-sans text-sm font-medium"
      >
        versão 1.0.0
      </Label>
    </footer>
  );
};
