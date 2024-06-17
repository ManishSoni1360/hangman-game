"use client";
import { newGame } from "@/lib/actions/action";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const NewGameBtn = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Game");

  const [btnClicked, setBtnClicked] = useState<boolean>(false);
  const [gameName, setGameName] = useState<string>("");

  const email: string = session?.user?.email as string;
  const saveNewGame = async () => {
    if (!gameName) {
      toast.error("Please Enter Game Name");
      return;
    }
    try {
      const response = await newGame(email as string, gameName);
      if (!response.ok) {
        toast.error("Failed to start a new game");
        throw new Error("Failed to start a new game");
      }
      const data = await response.json();
      if (pathname.split("/").at(-1) === "game") {
        router.push(`/game?gameId=${encodeURIComponent(data.id)}`);
        setTimeout(() => {
          location.reload();
        }, 500);
      } else router.push(`/game?gameId=${encodeURIComponent(data.id)}`);
      setGameName("");
    } catch (error) {
      toast.error("Failed to start a new game");
      console.error("Error starting a new game:", error);
    } finally {
      setBtnClicked(false);
    }
  };

  const startNewGame = async () => {
    setBtnClicked(true);
  };

  return (
    <>
      <button
        onClick={startNewGame}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {t("new-game")}
      </button>
      {btnClicked && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-35">
          <div className="bg-white w-1/4 h-fit p-4 rounded-lg">
            <label className="font-medium text-base text-slate-400">
              {t("enter-name")}
            </label>
            <input
              value={gameName}
              name="gameName"
              onChange={(e) => setGameName(e.target.value)}
              className="w-full outline-none p-2 font-medium text-slate-500 border border-slate-300"
            />
            <div className="flex justify-between mt-5">
              <button
                className="bg-green-200 text-green-500 font-medium hover:bg-green-500 hover:text-white border border-green-500 rounded-md py-2 px-4"
                onClick={saveNewGame}
              >
                {t("saveBtn")}
              </button>
              <button
                className="bg-red-200 text-red-500 font-medium hover:bg-red-500 hover:text-white border border-red-500 rounded-md py-2 px-4"
                onClick={() => setBtnClicked(false)}
              >
                {t("closeBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewGameBtn;
