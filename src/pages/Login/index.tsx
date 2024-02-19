import React from "react";

// import ProconLogo from "@/assets/procon-logo.svg";
import { ProconLogo } from "@/assets/procon-logo";
import { FooterSupport } from "@/components/footer-support";
import { LoginForm } from "@/components/forms/Login";

export const Login: React.FC = () => {
  return (
    <div
      id="container"
      className="w-screen h-svh pt-8 flex flex-col justify-between"
    >
      <div className="w-full flex flex-col flex-1 items-center justify-center gap-y-10 px-8 lg:flex-row lg:space-x-24">
        <aside
          id="logo"
          className="flex items-center flex-col"
        >
          <p className="font-sans text-4xl">Plantão</p>
          <ProconLogo />
        </aside>
        <LoginForm />
      </div>
      <FooterSupport />
    </div>
  );
};
