import {
    HttpStatus
} from "@nestjs/common";
import {
    ApiProperty
} from "@nestjs/swagger";

export class SuccessLogoutResponseDTO {
    @ApiProperty({
        type: "string"
    })
    message: string

    @ApiProperty({
        type: "number",
        format: "HTTPStatus"
    })
    code: HttpStatus
}