import {
    ApiProperty
} from "@nestjs/swagger";

export class RegisterDTO {
    @ApiProperty({
        type: "string",
        example: "ibrahimdagci@nibgat.com",
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
        maxLength: 55,
        minLength: 3
    })
    fullName: string

    @ApiProperty({
        type: "string",
        example: "+908503088772",
        required: true,
        maxLength: 55,
        minLength: 3
    })
    phone: string

    @ApiProperty({
        type: "string",
        example: "password",
        required: true,
        maxLength: 55,
        minLength: 3
    })
    password: string
}