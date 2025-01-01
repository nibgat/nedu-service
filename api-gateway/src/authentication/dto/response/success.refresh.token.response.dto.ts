import {
    ApiProperty
} from "@nestjs/swagger";

export class SuccessRefreshTokenResponseDTO {
    @ApiProperty({
        type: "string",
        format: "JWT Token"
    })
    accessToken: string;

    @ApiProperty({
        type: "string",
        format: "JWT Token"
    })
    refreshTokens: string[];
}
