import React from "react";

import { ProconLogo } from "@/assets/procon-logo";
import { FooterSupport } from "@/components/footer-support";
import { SignUpForm } from "@/components/forms/SignUp";

export const SignUp: React.FC = () => {
  return (
    <div
      id="container"
      className="w-screen h-dvh flex flex-col justify-between pt-8 lg:pt-0 overflow-x-hidden"
    >
      <div
        className="w-full 
        flex flex-col flex-1 items-center
       justify-center gap-y-10 px-8 lg:flex-row lg:space-x-24 mb-8 lg:mb-0 "
      >
        <aside
          id="logo"
          className="flex items-center flex-col"
        >
          <p className="font-sans text-4xl">Plantão</p>
          <ProconLogo />
        </aside>
        <SignUpForm />
      </div>
      <FooterSupport />
    </div>
  );
};
