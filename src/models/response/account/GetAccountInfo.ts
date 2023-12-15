import { AccountInfo } from "@/models/entity/AccountInfo";
import { BaseObject } from "@/models/entity/BaseObject";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";

export class GetAccountInfo extends BaseObject {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AccountInfo)
  userInfo: AccountInfo
}