import { BaseObject } from "@/models/entity/BaseObject";
import { FeedContentWithAcount } from "@/models/entity/FeedContent";
import { Transform, Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { Paginations } from "../mixins/Pagination";

export class GetContentList extends BaseObject {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  @Type(() => FeedContentWithAcount)
  content: FeedContentWithAcount[]

  // @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Paginations)
  page: Paginations
}