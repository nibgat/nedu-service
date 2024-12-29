import {
    IsDefined,
    IsString,
    IsEmail,
    Length
} from "class-validator";

export class TestDTO {
    @Length(3, 55)
    @IsString()
    @IsDefined()
    fullName: string;

    @IsEmail()
    @Length(8, 100)
    @IsDefined()
    mail: string;
}