import {
    IsDefined,
    IsString,
    IsEmail,
    Length,
    IsHash
} from "class-validator";

export class LoginDTO {
    @IsEmail()
    @Length(8, 100)
    @IsDefined()
    mail: string;

    @IsHash("md5")
    @IsString()
    @IsDefined()
    password: string
}