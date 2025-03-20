import { GameHashData } from "../types/nhlTypes";
import SHA256 from "crypto-js/sha256";

export const hashGameData = (gameData: GameHashData) => {
  const formattedData = JSON.stringify(gameData);
  return SHA256(formattedData).toString();
};
