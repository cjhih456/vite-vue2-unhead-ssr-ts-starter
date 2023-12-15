import { BaseObject } from "@/models/entity/BaseObject"
import { IsString } from "class-validator"

export class Login extends BaseObject {
  @IsString()
  token: string
  @IsString()
  refreshToken: string
}