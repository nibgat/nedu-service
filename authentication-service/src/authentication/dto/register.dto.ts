import {
    IsMobilePhone,
    IsDefined,
    IsString,
    Matches,
    IsEmail,
    Length,
    IsHash
} from "class-validator";

export class RegisterDTO {
    @IsEmail()
    @Length(8, 100)
    @IsDefined()
    mail: string;

    @Length(3, 55)
    @IsString()
    @IsDefined()
    fullName: string;

    @IsMobilePhone()
    @Matches(/^[0-9]*$/, {
        message: "only-number"
    })
    @IsDefined()
    phone: string

    @IsHash("md5")
    @IsString()
    @IsDefined()
    password: string
}