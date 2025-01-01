import {
    IsDefined,
    IsString,
    IsJWT
} from "class-validator";

export class RefreshTokenDTO {
    @IsJWT()
    @IsString()
    @IsDefined()
    token: string;
}
