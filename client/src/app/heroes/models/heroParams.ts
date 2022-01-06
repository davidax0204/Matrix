export class HeroParams {
  whoseHeroes: string = '';
  ability: string = 'all';
  minCurrentPower: number = 0;
  maxCurrentPower: number = 10000;
  pageNumber: number = 1;
  pageSize: number = 5;
  orderBy: string = 'currentPower';
}
