import { Hero } from "./hero";

export class HeroPagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;

  constructor(
    currentPage: number,
    itemsPerPage: number,
    totalItems: number,
    totalPage: number
  ) {
    this.currentPage = currentPage;
    this.itemsPerPage = itemsPerPage;
    this.totalItems = totalItems;
    this.totalPages = totalPage;
  }
}

export class PaginatedResult {
  heroes: Hero[];
  pagination: HeroPagination;
}
