//shoutout chatgpt for this great info

import { hyphenateAndLowercase } from "../utils/utils";

const nhlTeamColors: Record<string, string> = {
  // Anaheim Ducks
  "ducks-primary": "#FC4C02", // Orange
  "ducks-secondary": "#B9975B", // Gold

  // Boston Bruins
  "bruins-primary": "#FFB81C", // Gold
  "bruins-secondary": "#774212", // Brown

  // Buffalo Sabres
  "sabres-primary": "#003087", // Royal Blue
  "sabres-secondary": "#FFB81C", // Gold

  // Calgary Flames
  "flames-primary": "#C8102E", // Red
  "flames-secondary": "#F1BE48", // Gold

  // Carolina Hurricanes
  "hurricanes-primary": "#C8102E", // Red
  "hurricanes-secondary": "#012169", // Blue

  // Chicago Blackhawks
  "blackhawks-primary": "#C8102E", // Red
  "blackhawks-secondary": "#FFB81C", // Gold

  // Colorado Avalanche
  "avalanche-primary": "#6F263D", // Burgundy
  "avalanche-secondary": "#236192", // Steel Blue

  // Columbus Blue Jackets
  "blue-jackets-primary": "#041E42", // Union Blue
  "blue-jackets-secondary": "#C8102E", // Goal Red

  // Dallas Stars
  "stars-primary": "#00843D", // Victory Green
  "stars-secondary": "#A2AAAD", // Silver

  // Detroit Red Wings
  "red-wings-primary": "#C8102E", // Red
  "red-wings-secondary": "#C8102E", // White (not in list but inferred)

  // Edmonton Oilers
  "oilers-primary": "#00205B", // Royal Blue
  "oilers-secondary": "#FC4C02", // Orange

  // Florida Panthers
  "panthers-primary": "#041E42", // Blue
  "panthers-secondary": "#C8102E", // Red

  // Los Angeles Kings
  "kings-primary": "#000000",
  "kings-secondary": "#A2AAAD",

  // Minnesota Wild
  "wild-primary": "#007A33", // Green
  "wild-secondary": "#A6192E", // Iron Range Red

  // Montreal Canadiens
  "canadiens-primary": "#A6192E", // Red
  "canadiens-secondary": "#001E62", // Blue

  // Nashville Predators
  "predators-primary": "#FFB81C", // Gold
  "predators-secondary": "#041E42", // Dark Blue

  // New Jersey Devils
  "devils-primary": "#C8102E", // Red
  "devils-secondary": "#000000", // Black (not in list but inferred)

  // New York Islanders
  "islanders-primary": "#003087", // Royal Blue
  "islanders-secondary": "#FC4C02", // Orange

  // New York Rangers
  "rangers-primary": "#0032A0", // Blue
  "rangers-secondary": "#C8102E", // Red

  // Ottawa Senators
  "senators-primary": "#C8102E", // Red
  "senators-secondary": "#B9975B", // Gold

  // Philadelphia Flyers
  "flyers-primary": "#FA4616", // Orange
  "flyers-secondary": "#000000", // Black (not in list but inferred)

  // Pittsburgh Penguins
  "penguins-primary": "#FFB81C", // Gold
  "penguins-secondary": "#000000", // Black (not in list but inferred)

  // San Jose Sharks
  "sharks-primary": "#006271", // Deep Pacific Teal
  "sharks-secondary": "#000000", // Black (not in list but inferred)

  // Seattle Kraken
  "kraken-primary": "#041E42", // Deep Sea Blue
  "kraken-secondary": "#9CDBD9", // Ice Blue

  // St. Louis Blues
  "blues-primary": "#003087", // Blue
  "blues-secondary": "#FFB81C", // Gold

  // Tampa Bay Lightning
  "lightning-primary": "#00205B", // Blue
  "lightning-secondary": "#A2AAAD", // Silver

  // Toronto Maple Leafs
  "maple-leafs-primary": "#00205B", // Blue
  "maple-leafs-secondary": "#00205B", // Green

  // Vancouver Canucks
  "canucks-primary": "#00205B", // Blue
  "canucks-secondary": "#00843D", // Green

  // Vegas Golden Knights
  "golden-knights-primary": "#B9975B", // Gold
  "golden-knights-secondary": "#000000", // Red

  // Washington Capitals
  "capitals-primary": "#C8102E", // Red
  "capitals-secondary": "#041E42", // Dark Blue

  // Winnipeg Jets
  "jets-primary": "#041E42",
  "jets-secondary": "#004C97",
};

export const getTeamPrimaryColour = (teamName: string) =>
  nhlTeamColors[`${hyphenateAndLowercase(teamName)}-primary`];

export const getTeamSecondaryColour = (teamName: string) =>
  nhlTeamColors[`${hyphenateAndLowercase(teamName)}-secondary`];

export default nhlTeamColors;
