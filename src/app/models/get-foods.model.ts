import { ISaveFood } from "./save-food.model";

export interface IGetFoods {
  pageNumber: number,
  current_page: number,
  per_page: number,
  pageSize: number,
  firstPage: string,
  lastPage: string,
  last_page: number,
  totalPages: number,
  totalRecords: number,
  total: number,
  from: number,
  to: number,
  next_page_url: string,
  prev_page_url: string,
  data: ISaveFood[]
}