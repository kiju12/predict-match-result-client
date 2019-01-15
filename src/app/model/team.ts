export enum Position {
  GOALKEEPER = 'GOALKEEPER', DEFENCE = 'DEFENCE', HELP = 'HELP', ATTACK = 'ATTACK'
}

export interface Team {
  id: number;
  name: string;
  imageLink: string;
  players: Player[];
  formation: string;
  selected: boolean;
}

export interface Player {
  firstname: string;
  lastname: string;
  rating: number;
  position: Position;
}

export interface FetchedTeam {
  id: number;
  name: string;
  linkToImage: string;
}
