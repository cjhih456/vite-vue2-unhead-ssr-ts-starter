import { Exclude } from "class-transformer"
import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, Length } from "class-validator"
import { BaseObjectWithDates } from "./BaseObject"

export class AccountInfo extends BaseObjectWithDates {
  @IsNumber()
  idx: number
  @IsString()
  @Length(2, 40)
  id: string
  @IsString()
  @Length(0, 255)
  @IsOptional()
  desc: string
  @IsString()
  @Length(0, 255)
  @IsOptional()
  thumb: string
  @IsPhoneNumber("KR")
  @IsOptional()
  phone: string
  @IsEmail()
  @IsOptional()
  email: string
}

export class AccountInfoWithPassword extends AccountInfo {
  @Exclude()
  @IsStrongPassword()
  password: string
}