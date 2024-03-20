import { ProconLogo } from "@assets/procon-logo";
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
          className="flex items-center flex-col"
        >
          <p className="font-sans text-4xl">Plantão</p>
          <ProconLogo />
        </aside>
        {children}
      </div>
      <FooterSupport />
    </div>
  );
};
