"use client";
import React from "react";
import Logo from "./Logo";
import UserInfo from "./UserInfo";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { status: sessionStatus } = useSession();
  const pathname = usePathname().split("/").at(-1);
  const isAuthPage = ["login", "forgotPassword", "register"].includes(
    pathname as string
  );
  if (isAuthPage) return null;

  if (sessionStatus === "loading" || sessionStatus !== "authenticated")
    return null;

  return (
    <nav className="bg-gray-50 h-[3rem] w-screen flex justify-between items-center border-darkGray border-b border-opacity-20 p-3 fixed z-30">
      <Logo />
      <div className="flex items-center gap-5">
        <UserInfo />
      </div>
    </nav>
  );
};

export default Navbar;
