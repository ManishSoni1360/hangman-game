"use client";
import Image from "next/image";
import SearchIcon from "@/../public/search.svg";
import { useSession } from "next-auth/react";
import { getGameHistory } from "@/lib/actions/action";
import toast from "react-hot-toast";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import GameHistory from "@/components/GameHistory/GameHistory";
import { useEffect, useState } from "react";
import BallTriangleSpinner from "@/components/BallTriangleSpinner";
import { useTranslations } from "next-intl";
import NewGameBtn from "./(game)/game/_components/NewGameBtn";

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();
  const email = session?.user?.email;
  const t = useTranslations("Home");

  const [searchByName, setSearchByName] = useState<string>("");

  const {
    data: gameHistory,
    isLoading,
    error,
  } = useQuery<GameHistoryProps[]>({
    queryKey: ["gameHistory", email],
    queryFn: async () => {
      const response = await getGameHistory(email as string);
      if (!response.ok) {
        toast.error("Failed to get game history");
        throw new Error("Failed to get game history");
      }
      const data: GameHistoryProps[] = await response.json();
      return data;
    },
    enabled: !!email,
    placeholderData: keepPreviousData,
  });

  if (sessionStatus === "loading" || sessionStatus !== "authenticated")
    return null;

  if (isLoading || !gameHistory) return <BallTriangleSpinner />;

  if (error) {
    toast.error("Something went wrong...");
    return null;
  }

  return (
    <div className="mt-5 mx-4">
      <div className="flex gap-2 w-fit min-w-[20rem] py-1.5 px-4 border border-gray-300 rounded-xl bg-gray-100 text-gray-500">
        <Image src={SearchIcon} alt="search" width={18} height={18} />
        <input
          placeholder="Search Your Game Name"
          className="outline-none bg-gray-100 text-base"
          name="searchByName"
          value={searchByName}
          onChange={(e) => setSearchByName(e.target.value)}
        />
      </div>
      <div className="flex justify-between px-5 bg-gray-100 mt-6 py-2 items-center">
        <h1 className="font-medium text-slate-600 underline text-xl">
          {t("gaming-history")}
        </h1>
        <NewGameBtn />
      </div>

      {gameHistory && gameHistory?.length > 0 ? (
        <GameHistory gameHistory={gameHistory} searchByName={searchByName} />
      ) : (
        <h1 className="font-semibold text-slate-600 border border-slate-300 p-4 text-center w-full mt-4 bg-slate-100">
          {t("no-previous-history")}
        </h1>
      )}
    </div>
  );
}
