export interface Game {
  status: GameStatus;
  progress?: GameProgress;
  startTime: string;
  goals: Goal[];
  scores: GameScores;
  teams: GameTeams;
  gameStats?: GameStats;
  preGameStats?: PreGameStats;
  playoffSeries?: PlayoffSeries;
  streaks?: Streaks;
  standings?: Standings;
  currentStats?: CurrentStats;
  links?: GameLinks;
  errors?: GameError[];
}

export interface GameStatus {
  state: "FINAL" | "LIVE" | "PREVIEW" | "POSTPONED";
}

export interface GameProgress {
  currentPeriod: number;
  currentPeriodOrdinal: string;
  currentPeriodTimeRemaining: {
    pretty: string;
    min: number;
    sec: number;
  };
}

export interface Goal {
  gameplay?: GameplayGoal;
  shootout?: ShootoutGoal;
}

export interface GameplayGoal {
  assists: Assist[];
  emptyNet?: boolean;
  min: number;
  period: string;
  scorer: Scorer;
  strength?: "PPG" | "SHG";
  team: string;
}

export interface Assist {
  player: string;
  playerId: number;
  seasonTotal: number;
}

export interface Scorer {
  player: string;
  playerId: number;
  seasonTotal: number;
  sec: number;
}

export interface ShootoutGoal {
  period: "SO";
  scorer: Scorer;
  team: string;
}

export interface GameScores {
  home: number;
  away: number;
  overtime?: boolean;
  shootout?: boolean;
}

export interface GameTeams {
  away: TeamInfo;
  home: TeamInfo;
}

export interface TeamInfo {
  abbreviation: string;
  id: number;
  locationName: string;
  shortName: string;
  teamName: string;
}

export interface GameStats {
  blocked: number;
  faceOffWinPercentage: number;
  giveaways: number;
  hits: number;
  pim: number;
  powerPlay: PowerPlay;
  shots: number;
  takeaways: number;
}

export interface PowerPlay {
  goals: number;
  opportunities: number;
  percentage: number;
  shots: number;
}

export interface PreGameStats {
  records: TeamRecord;
}

export interface TeamRecord {
  wins: number;
  losses: number;
  ot: number;
}

export interface PlayoffSeries {
  round: number;
  wins: TeamWins;
}

export interface TeamWins {
  home: number;
  away: number;
}

export interface Streaks {
  type: "WINS" | "LOSSES" | "OT";
  count: number;
}

export interface Standings {
  divisionRank: string;
  leagueRank: string;
  pointsFromPlayoffSpot: string;
}

export interface CurrentStats {
  records: TeamRecord;
  streaks?: Streaks;
  standings?: Standings;
  playoffSeries?: PlayoffSeries;
}

export interface GameLinks {
  gameCenter?: string;
  playoffSeries?: string;
  videoRecap?: string;
}

export interface GameError {
  error: string;
  details?: {
    goalCount?: number;
    scoreCount?: number;
  };
}

export interface DateFields {
  raw: string;
  pretty: string;
}

export type GameHashData = {
  home: TeamInfo;
  away: TeamInfo;
  date: string;
};

export type NHLApiResponse = {
  date: DateFields;
  games: Game[];
};
