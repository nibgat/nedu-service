import { ApiProperty } from "@nestjs/swagger";

export class TestDTO {
    @ApiProperty({
        type: "string",
        example: "Sezai",
        required: true,
        maxLength: 55,
        minLength: 3
    })
    fullName: string

    @ApiProperty({
        type: "string",
        example: "sezai.ozturk@nibgat.com",
        required: true,
        format: "E - Mail",
        maxLength: 100,
        minLength: 8
    })
    mail: string
}