"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslations } from "use-intl";

const Logo = () => {
  const t = useTranslations("Navbar");
  const router = useRouter();

  const dashboardRedirect = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center gap-3">
      {/* <Image
        src={LogoIcon}
        alt="logo"
        width={32}
        height={32}
        onClick={dashboardRedirect}
        title={t("dashboard-redirect")}
      /> */}
      <span>Hangman</span>
    </div>
  );
};

export default Logo;
