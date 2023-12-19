import { Transform, Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDefined, IsNotEmptyObject, IsNumber, IsObject, IsString, minLength, ValidateNested } from "class-validator";
import { AccountInfo } from "./AccountInfo";
import { BaseObjectWithDates } from "./BaseObject";

export class FeedContent extends BaseObjectWithDates {
  @IsNumber()
  idx: number = 0
  @IsNumber()
  uid: number = 0
  @IsString()
  content: string = ''
  @IsNumber({ allowNaN: false, allowInfinity: false })
  likeCount: number = 0
}

export class FeedContentWithAcount extends FeedContent {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AccountInfo)
  writer: AccountInfo
}

export class FeedContentWithAccountAndLikeAccounts extends FeedContentWithAcount {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  @Type(() => AccountInfo)
  like: AccountInfo[]
}