import { GameHashData } from "../types/nhlTypes";
import SHA256 from "crypto-js/sha256";

export const hashGameData = (gameData: GameHashData) => {
  const formattedData = JSON.stringify(gameData);
  return SHA256(formattedData).toString();
};

export const dateTransformer = {
  input: (data: any): any => {
    if (data?.date && typeof data.date === "string") {
      return {
        ...data,
        date: new Date(data.date),
      };
    }
    return data;
  },
  output: (data: any): any => {
    if (data?.date && data.date instanceof Date) {
      return {
        ...data,
        date: data.date.toISOString(),
      };
    }
    return data;
  },
};
