"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const GameHistory = ({
  gameHistory,
  searchByName,
}: {
  gameHistory: GameHistoryProps[];
  searchByName: string;
}) => {
  const router = useRouter();
  const [filteredGames, setFilteredGames] =
    useState<GameHistoryProps[]>(gameHistory);
  const t = useTranslations("Game");

  const handleGameContinue = (gameId: number) => {
    router.push(`/game?gameId=${encodeURIComponent(gameId)}`);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = gameHistory.filter((game) =>
        game.name.toLowerCase().includes(searchByName.toLowerCase())
      );
      setFilteredGames(filtered);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchByName, gameHistory]);

  return (
    <div className="h-[32rem] overflow-y-auto scrollbar-hide">
      {filteredGames.map((game) => (
        <div
          className="mt-4 border border-gray-300 px-4 py-2 rounded bg-gray-50 hover:bg-slate-100"
          key={game.id}
        >
          <div className="flex gap-2 items-center justify-between">
            <div className="flex flex-col gap-2 items-center justify-center">
              <h1 className="font-medium text-slate-500">{t("game-name")}</h1>
              <span className="font-semibold text-slate-700">
                {game.name.length > 0 ? game.name : "NA"}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <h1 className="font-medium text-slate-500">{t("status")}</h1>
              <span
                className={`font-semibold ${game.state.toLowerCase().includes("won") ? "text-green-500" : game.state.toLowerCase().includes("lost") ? "text-red-500" : "text-slate-700"}`}
              >
                {game.state}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <h1 className="font-medium text-slate-500">{t("word-status")}</h1>
              <span className="font-semibold text-slate-700">
                {game.current_word_state.split("").join(" ")}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <h1 className="font-medium text-slate-500">
                {t("incorrect-guess-left")}
              </h1>
              <span className="font-semibold text-slate-700">
                {game.remaining_incorrect_guesses}
              </span>
            </div>
            {game.state.toLowerCase().includes("won") ? (
              <button className="bg-green-500 text-white px-4 py-2 rounded font-medium h-fit cursor-default">
                {t("completed")}
              </button>
            ) : (
              <button
                onClick={() => handleGameContinue(game.id)}
                className="bg-blue-400 text-white px-4 py-2 rounded font-medium h-fit hover:bg-blue-600"
              >
                {t("continue")}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameHistory;
