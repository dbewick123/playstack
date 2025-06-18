//Types
import { SingleGame } from "../types/game";

export default async function getGame(id: number): Promise<SingleGame> {
  //Check data appropriateness
  if (!id) {
    throw new Error("Invalid ID: ID must be a non-null, non-zero number");
  }

  // Build URL
  const url = `${import.meta.env.VITE_BACKEND_API_URL}/games/${id}`;

  try {
    // Make Call
    const response = await fetch(url);

    // Handle Error
    if (!response.ok) {
      throw new Error(`Response returned an error status: ${response?.status}`);
    }

    // Build Return SingleGame
    const data = await response.json()
    console.log(data)
    return data as SingleGame;
  
  } catch (error) {
    throw new Error(
      `Error caught by getGame catch block: ${(error as Error).message}`
    );
  }
}
