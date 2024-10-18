import LogoSUS from "@assets/Logo_SUS.png";

import { FooterSupport } from "@components/footerSupport";
import { ReactElement } from "react";

export const AuthLayout: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  return (
    <div
      id="container"
      className="w-dvw h-dvh pt-8 flex flex-col justify-between overflow-x-hidden overflow-y-auto"
    >
      <div className="w-full flex flex-col flex-1 items-center justify-center gap-y-10 px-8 lg:flex-row lg:space-x-24">
        <aside
          id="logo"
          className="relative flex items-start flex-col"
        >
          <p className="font-sans text-3xl absolute text-secondary-foreground font-bold">
            Plantão
          </p>
          <img
            src={LogoSUS}
            alt="Logo"
            className="h-40 aspect-auto"
          />
        </aside>
        {children}
      </div>
      <FooterSupport />
    </div>
  );
};
