"use client";
import NewGameBtn from "./NewGameBtn";
import { getGameState, guessLetter } from "@/lib/actions/action";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import VirtualKeyboard from "./VirtualKeyboard";
import Image from "next/image";
import GoBackIcon from "@/../public/go-back.svg";
import BallTriangleSpinner from "@/components/BallTriangleSpinner";
import { useTranslations } from "next-intl";

interface GameState {
  current_word_state: string;
  state: string;
  incorrect_guesses: number;
  remaining_incorrect_guesses: number;
}

const GamePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const t = useTranslations("Game");

  const email: string = session?.user?.email as string;
  const gameId: string = params.get("gameId") as string;

  const [gameState, setGameState] = useState<GameState | null>(null);
  const [guessedLetter, setGuessedLetter] = useState<string>("");

  useQuery({
    queryKey: ["gameState"],
    queryFn: async () => {
      const response = await getGameState(email, gameId);
      if (!response.ok) {
        toast.error("Failed to fetch game state");
        throw new Error("Failed to fetch game state");
      }
      const data: GameState = await response.json();
      setGameState(data);
      toast.success("Successfully fetched game state");
      return data;
    },
    enabled: !!gameId,
  });

  const handleGuess = async () => {
    if (guessedLetter.length !== 1) {
      toast.error("Please enter a single letter");
      return;
    }

    try {
      const response = await guessLetter(
        email,
        gameId as string,
        guessedLetter
      );
      if (!response.ok) {
        throw new Error("Failed to submit guess");
      }
      const data = await response.json();
      if (data.guess_correct) toast.success("Correct guess!");
      else toast.error("Oops, incorrect guess!");
      setGameState(data.game_state);
      setGuessedLetter("");
    } catch (error) {
      console.error("Error submitting guess:", error);
    }
  };

  const handleGoBack = () => {
    router.push("/");
  };

  if (!gameState) return <BallTriangleSpinner />;

  if (gameState.state.toLowerCase().includes("won"))
    toast.success("You won the game, start a new game");

  if (gameState.state.toLowerCase().includes("lost"))
    toast.success("You lost the game, start a new game");

  return (
    <div className="flex flex-col items-center min-h-screen pt-5 bg-gray-100 rounded-md">
      <div
        className="flex gap-2 mx-auto ml-5 items-center cursor-pointer"
        onClick={handleGoBack}
      >
        <Image src={GoBackIcon} alt="back" height={22} width={22} />
        <span className="font-medium text-slate-700">{t("go-back")}</span>
      </div>
      <h1 className="text-4xl font-bold mb-4">{t("hangman-game")}</h1>
      <div className="bg-white shadow-md rounded p-4 w-full max-w-md">
        <p className="text-xl mb-4 text-slate-500">
          {t("word")}:{" "}
          <span className="font-medium text-slate-700">
            {gameState.current_word_state.split("").join(" ")}
          </span>
        </p>
        <p className="mb-4 text-slate-500">
          {t("state")}:{" "}
          <span
            className={`font-medium ${gameState.state.toLowerCase().includes("won") ? "text-green-500" : gameState.state.toLowerCase().includes("lost") ? "text-red-500" : "text-slate-700"}`}
          >
            {gameState.state}
          </span>
        </p>
        <p className="mb-4 text-slate-500">
          {t("incorrect-guesses")}:{" "}
          <span className="font-medium text-slate-700">
            {gameState.incorrect_guesses}
          </span>
        </p>
        <p className="mb-4 text-slate-500">
          {t("remaining-guesses")}:{" "}
          <span className="font-medium text-slate-700">
            {gameState.remaining_incorrect_guesses}
          </span>
        </p>

        <VirtualKeyboard
          currentWordState={gameState.current_word_state}
          setGuessedLetter={setGuessedLetter}
          guessedLetter={guessedLetter}
        />
        <div className="flex space-x-4 mt-5 justify-center">
          <button
            onClick={handleGuess}
            className={`${
              gameState.state.toLowerCase().includes("won") ||
              gameState.state.toLowerCase().includes("lost")
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white px-4 py-2 rounded`}
            disabled={
              gameState.state.toLowerCase().includes("won") ||
              gameState.state.toLowerCase().includes("lost")
            }
          >
            {t("guessBtn")}
          </button>
          <NewGameBtn />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
