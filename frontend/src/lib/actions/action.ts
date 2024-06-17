const BASE_URL = "http://127.0.0.1:8000/api/game";

export const newGame = async (email: string, gameName: string) => {
  try {
    const response = await fetch(`${BASE_URL}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, gameName }),
    });
    return response;
  } catch (error) {
    console.error("Error starting a new game:", error);
    throw new Error("Failed to start a new game");
  }
};

export const getGameState = async (email: string, id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch game state");
    }
    return response;
  } catch (error) {
    console.error("Error fetching game state:", error);
    throw new Error("Failed to fetch game state");
  }
};

export const guessLetter = async (
  email: string,
  gameId: string,
  guessedLetter: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/${gameId}/guess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess: guessedLetter, email }),
    });
    if (!response.ok) {
      throw new Error("Failed to submit guess");
    }
    return response;
  } catch (error) {
    console.error("Error submitting guess:", error);
    throw new Error("Failed to submit guess");
  }
};

export const getGameHistory = async (email: string) => {
  try {
    const response = await fetch(`${BASE_URL}/gameHistory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error("Failed to get user's games history");
    }
    return response;
  } catch (error) {
    console.error("Error submitting guess:", error);
    throw new Error("Failed to get user's games history");
  }
};
