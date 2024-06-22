export interface Player {
  name: string;
  roles: Role;
  votingDays: VotingInfo[];
  possibilities: PlayerPossibilities;
}

export interface PlayerPossibilities {
  evilWorlds: number;
  minionWorlds: number;
  demonWorlds: number;
}

export enum Role {
  Townsfolk = 1 << 1,
  Minion = 1 << 2,
  Demon = 1 << 3,
}

export enum StorytellerChoice {
  Unknown,
  True,
  False,
}

export interface StorytellerInfo {
  voted: StorytellerChoice;
  nominated: StorytellerChoice;
}

export interface VotingInfo {
  voted: boolean;
  nominated: boolean;
}

export interface World {
  roles: Role[];
  valid: boolean;
}
