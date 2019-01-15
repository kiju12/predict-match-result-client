export interface MatchesData {
  homeTeamId: number;
  awayTeamId: number;
  matches: MatchData[];
}

export interface MatchData {
  homeGoals: number;
  awayGoals: number;
}
