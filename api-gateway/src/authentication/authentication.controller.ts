import {
    Controller,
    Body,
    Post
} from "@nestjs/common";
import {
    AuthenticationService
} from "./authentication.service";
import {
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";
import {
    RegisterDTO
} from "./dto/request/register.dto";
import {
    SuccessRegisterResponsDTO
} from "./dto/response/succes.register.response.dto";

@Controller("authentication")
export class AuthenticationController {
    constructor(
        private authenticationService: AuthenticationService
    ) { }
    @ApiTags("Authentication")
    @ApiOkResponse({
        type: SuccessRegisterResponsDTO
    })
    @Post("register")
    async test(@Body() body: RegisterDTO) {
        console.log("gönderildi");
        return await this.authenticationService.register(body);
    }
}