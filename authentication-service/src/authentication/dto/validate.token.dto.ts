import {
    IsDefined,
    IsString,
    IsJWT
} from "class-validator";

export class ValidateTokenDTO {
    @IsJWT()
    @IsString()
    @IsDefined()
    token: string;
}
