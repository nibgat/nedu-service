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
    SuccessRefreshTokenResponseDTO
} from "./dto/response/success.refresh.token.response.dto";
import {
    SuccessRegisterResponsDTO
} from "./dto/response/succes.register.response.dto";
import {
    SuccessLoginResponsDTO
} from "./dto/response/success.login.response.dto";
import {
    RefreshTokenDTO
} from "./dto/request/refresh.token.dto";
import {
    RegisterDTO
} from "./dto/request/register.dto";
import {
    LoginDTO
} from "./dto/request/login.dto";

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
    async register(@Body() body: RegisterDTO) {
        return await this.authenticationService.register(body);
    }

    @ApiTags("Authentication")
    @ApiOkResponse({
        type: SuccessLoginResponsDTO
    })
    @Post("login")
    async login(@Body() body: LoginDTO) {
        return await this.authenticationService.login(body);
    }

    @ApiTags("Authentication")
    @ApiOkResponse({
        type: SuccessRefreshTokenResponseDTO
    })
    @Post("refreshToken")
    async refreshToken(@Body() body: RefreshTokenDTO) {
        return this.authenticationService.refreshToken(body);
    }
}