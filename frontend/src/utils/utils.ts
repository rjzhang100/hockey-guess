import { GameHashData } from "../types/nhlTypes";
import SHA256 from "crypto-js/sha256";

export const hashGameData = (gameData: GameHashData) => {
  const formattedData = JSON.stringify(gameData);
  return SHA256(formattedData).toString();
};

export const hyphenateAndLowercase = (inputString: string) =>
  inputString
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "");

export const getWinner = (gameInfo: any) => {
  const [team1, team2] = Object.keys(gameInfo.scores);
  if (gameInfo.scores[team1] == gameInfo.scores[team2]) {
    return "TIE";
  }
  return `${gameInfo.scores[team1] > gameInfo.scores[team2] ? team1 : team2}`;
};

export const getYesterday = (): Date => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};
export const getTomorrow = (): Date => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};
