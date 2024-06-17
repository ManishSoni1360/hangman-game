"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import Avatar from "@/../public/navbar/avatar.svg";
import DropDownArrow from "@/../public/dropdown-arrow.svg";
import Logout from "@/../public/navbar/logout.svg";
import ResetPassword from "@/../public/navbar/reset-password.svg";
import { useTranslations } from "next-intl";

const UserInfo = () => {
  const t = useTranslations("Navbar");
  const { data: session, status: sessionStatus } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSignout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  return (
    <div
      className="flex items-center p-2 border-l-2 border-gray-300 cursor-pointer"
      onClick={toggleDropdown}
    >
      <div className="bg-whiteSmoke rounded-full p-1.5">
        <Image src={Avatar} alt="avatar" width={20} height={20} />
      </div>
      <p className="text-darkGray text-xs font-medium ml-2">
        {session?.user?.email}
      </p>
      <Image
        src={DropDownArrow}
        alt="dropdown arrow"
        width={24}
        height={24}
        className={`${isDropdownOpen ? "-rotate-90" : ""}`}
      />
      {isDropdownOpen && (
        <div className="absolute top-12 right-4 bg-white border border-gray-200 rounded-md shadow-lg p-2">
          <ul>
            {sessionStatus === "authenticated" && (
              <li className="border-b border-trolley pb-1">
                <button
                  onClick={handleSignout}
                  className="flex gap-4 items-center w-full text-left py-1 px-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
                >
                  <Image src={Logout} alt="logout" width="14" height="14" />
                  {t("logout")}
                </button>
              </li>
            )}
            <li className="pt-1">
              <button className="flex gap-4 text-left py-1 px-2 text-sm font-medium text-gray-800 hover:bg-gray-100">
                <Image
                  src={ResetPassword}
                  alt="reset password"
                  width="14"
                  height="14"
                />
                {t("reset-password")}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
