export interface Horse {
  id: number;
  name: string;
  color: string;
  conditions: number[];
}

export interface Race {
  round: number;
  distance: number;
  horses: Horse[];
  results?: Horse[];
  isComplete: boolean;
}

export interface GameState {
  horses: Horse[];
  races: Race[];
  currentRound: number;
  isGameStarted: boolean;
  isGameComplete: boolean;
  shouldContinue: boolean;
}
