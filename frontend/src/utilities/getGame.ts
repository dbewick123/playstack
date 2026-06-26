//Types
import { SingleGame } from "../types/game";
import { apiFetch } from "../api/client";

export default async function getGame(id: number): Promise<SingleGame> {
  //Check data appropriateness
  if (!id) {
    throw new Error("Invalid ID: ID must be a non-null, non-zero number");
  }

  try {
    // Make Call
    const response = await apiFetch(`/games/${id}`);

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
