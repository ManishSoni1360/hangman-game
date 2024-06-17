import React, { Dispatch, SetStateAction, useState } from "react";

const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const VirtualKeyboard = ({
  currentWordState,
  setGuessedLetter,
  guessedLetter,
}: {
  currentWordState: string;
  setGuessedLetter: Dispatch<SetStateAction<string>>;
  guessedLetter: string;
}) => {
  const handleBtnClicked = (key: string) => {
    setGuessedLetter(key);
  };

  return (
    <div className="flex flex-wrap justify-center mt-4">
      {keys.map((key) => (
        <button
          key={key}
          className={`m-1 p-2.5 border rounded shadow-md ${
            currentWordState.toLocaleLowerCase().includes(key.toLowerCase())
              ? "bg-gray-400 cursor-not-allowed"
              : guessedLetter.toLowerCase().includes(key.toLowerCase())
                ? "bg-blue-800 text-white"
                : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
          onClick={() => handleBtnClicked(key)}
          disabled={currentWordState.toLowerCase().includes(key.toLowerCase())}
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
