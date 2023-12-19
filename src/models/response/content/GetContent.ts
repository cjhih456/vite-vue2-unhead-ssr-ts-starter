import { BaseObject } from "@/models/entity/BaseObject";
import { FeedContentWithAccountAndLikeAccounts } from "@/models/entity/FeedContent";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";

export class GetContent extends BaseObject {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => FeedContentWithAccountAndLikeAccounts)
  content: FeedContentWithAccountAndLikeAccounts
}