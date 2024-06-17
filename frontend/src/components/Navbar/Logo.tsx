"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslations } from "use-intl";
import LogoIcon from "@/../public/logo.svg";

const Logo = () => {
  const t = useTranslations("Navbar");
  const router = useRouter();

  const dashboardRedirect = () => {
    router.push("/");
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={dashboardRedirect}
      title={t("dashboard-redirect")}
    >
      <Image src={LogoIcon} alt="logo" width={32} height={32} />
      <span className="font-semibold text-slate-700">Hangman</span>
    </div>
  );
};

export default Logo;
