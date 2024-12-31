import {
    IsStrongPassword,
    IsPhoneNumber,
    IsDefined,
    IsString,
    IsEmail,
    Length,
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

    @IsPhoneNumber("TR")
    phone: string

    @IsString()
    @IsDefined()
    password: string

}