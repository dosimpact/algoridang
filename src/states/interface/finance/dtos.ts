import { CoreOutput, CorePaginationInput } from "../common/dtos";
import { DailyStock } from "./entities";

export interface GetDayilStocksInput extends CorePaginationInput {
  term: string;
  sort?: "DESC" | "ASC";
}
export interface GetDayilStocksOutput extends CoreOutput {
  dailyStocks?: DailyStock[];
}
