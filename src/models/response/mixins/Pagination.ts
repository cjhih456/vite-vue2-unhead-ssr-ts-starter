import { IsNumber } from "class-validator"

export class Paginations {
  @IsNumber()
  pageSize: number
  @IsNumber()
  offset: number
}