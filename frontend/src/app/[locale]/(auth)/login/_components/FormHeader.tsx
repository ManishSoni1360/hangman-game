import { useTranslations } from "next-intl";
import React from "react";

const FormHeader = () => {
  const t = useTranslations("Login");
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4 text-darkGray tracking-wider">
        {t("log-in")}
      </h2>
      <p className="text-sm mb-10 text-center font-medium text-trolley">
        {t("login-message")}
      </p>
    </>
  );
};

export default FormHeader;
