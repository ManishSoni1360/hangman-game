"use client";
import Image from "next/image";
import React from "react";
import LoginImage from "@/../public/login/background.svg";
import FormHeader from "./FormHeader";
import FormBody from "./FormBody";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { isValidEmail, validatePassword } from "@/utils/authValidation";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const SignUpPage = () => {
  const t = useTranslations("Login");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;

    if (!isValidEmail(email)) {
      toast.error(t("email-invalid"));
      return;
    }

    if (!validatePassword(password)) {
      toast.error(t("password-invalid"));
      return;
    }

    try {
      const response = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("respp === ", response);
      const data = await response.json();
      console.log("data===== ", data);
      if (response.ok) {
        toast.success("Registered Successfully!");
        router.push("/login");
      } else toast.error("Something went wrong...");
    } catch (error) {
      toast.error("Something went wrong...");
      console.log("Error while signing up", error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center bg-white text-sm overflow-hidden -mt-[3rem]">
      <div className="flex-1">
        <Image
          src={LoginImage}
          alt="Login Image"
          style={{
            maxHeight: "100vh",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="flex-1 justify-center items-center flex">
        <div className="shadow-lg border border-gray-300 border-opacity-70 px-8 py-6 text-center w-fit">
          <FormHeader />
          <FormBody handleSubmit={handleSubmit} />
          <p
            className="my-2 text-center font-bold text-xs cursor-pointer text-slate-600"
            onClick={() => router.push("/login")}
          >
            Already have an account?{" "}
            <span className="text-blue-600">Log-In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
