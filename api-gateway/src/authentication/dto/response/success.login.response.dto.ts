import {
    ApiProperty
} from "@nestjs/swagger";

export class SuccessLoginResponseDTO {
    @ApiProperty({
        type: "string",
        format: "JWT Token"
    })
    accessToken: string;

    @ApiProperty({
        type: "string",
        format: "JWT Token"
    })
    refreshTokens: string;

    @ApiProperty({
        type: "string",
        example: "Sezai Öztürk"
    })
    fullName: string

    @ApiProperty({
        type: "string",
        example: "5368505454",
        format: "Phone Number ( Full number. )"
    })
    phone: string

    @ApiProperty({
        type: "string",
        format: "E - Mail",
        example: "sezaiozturk@nibgat.com"
    })
    mail: string
}
