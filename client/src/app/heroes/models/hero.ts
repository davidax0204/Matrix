export interface Hero {
  id: number;
  appUserId: string;
  name: string;
  ability: string;
  suitColors: string;
  currentPower: number;
  startingPower: number;
  trainingForToday: number;
  created: Date;
}
