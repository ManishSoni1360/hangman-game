import Image from "next/image";
import React, { FC, useState } from "react";
import EyeOpen from "@/../public/login/eyeOpen.svg";
import EyeClosed from "@/../public/login/eyeClosed.svg";
import { useTranslations } from "next-intl";

interface FormBodyProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const FormBody: FC<FormBodyProps> = ({ handleSubmit }) => {
  const t = useTranslations("Login");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <input
            type="text"
            name="email"
            placeholder={t("email*")}
            className="w-full px-4 py-2 border-b border-trolley border-opacity-70 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-8 flex border-b border-trolley border-opacity-70 rounded-md focus:outline-none focus:border-blue-500">
          <input
            type={`${!passwordVisible ? "password" : "text"}`}
            name="password"
            placeholder={t("password*")}
            className="w-full px-4 py-2 focus:outline-none"
          />

          <div
            className="flex items-center cursor-pointer"
            onClick={handlePasswordVisibility}
          >
            <Image
              src={passwordVisible ? EyeOpen : EyeClosed}
              alt="eye"
              width="17"
              height="17"
              className="mx-2"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            {t("log-in")}
          </button>
        </div>
      </form>
    </>
  );
};

export default FormBody;
