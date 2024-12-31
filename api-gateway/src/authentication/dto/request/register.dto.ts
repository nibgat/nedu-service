import {
    ApiProperty
} from "@nestjs/swagger";

export class RegisterDTO {
    @ApiProperty({
        type: "string",
        example: "example@nibgat.com",
        required: true,
        format: "E - Mail",
        maxLength: 100,
        minLength: 8
    })
    mail: string

    @ApiProperty({
        type: "string",
        example: "İbrahim Dağcı",
        required: true,
        maxLength: 100,
        minLength: 3
    })
    fullName: string

    @ApiProperty({
        type: "string",
        example: "8503088772",
        required: true,
        maxLength: 15,
        minLength: 3
    })
    phone: string

    @ApiProperty({
        type: "string",
        example: "7a3e26fe736f534e9abbd9b27e37d51f",
        format: "md5",
        required: true
    })
    password: string
}