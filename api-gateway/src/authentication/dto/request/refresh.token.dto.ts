import {
    ApiProperty
} from "@nestjs/swagger";

export class RefreshTokenDTO {
    @ApiProperty({
        type: "string",
        format: "JWT Token",
        required: true
    })
    token: string;
}
