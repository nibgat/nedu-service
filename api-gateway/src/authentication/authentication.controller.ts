import {
    Controller,
    UseGuards,
    Body,
    Post,
    Req,
    Put
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
    SuccessRegisterResponseDTO
} from "./dto/response/succes.register.response.dto";
import {
    SuccessLogoutResponseDTO
} from "./dto/response/succes.logout.response.dto";
import {
    SuccessLoginResponseDTO
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
import {
    AuthGuard
} from "src/guards/auth.guard";

@Controller("authentication")
export class AuthenticationController {
    constructor(
        private authenticationService: AuthenticationService
    ) { }

    @ApiTags("Authentication")
    @ApiOkResponse({
        type: SuccessRegisterResponseDTO
    })
    @Post("register")
    async register(@Body() body: RegisterDTO) {
        return await this.authenticationService.register(body);
    }

    @ApiTags("Authentication")
    @ApiOkResponse({
        type: SuccessLoginResponseDTO
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

    @ApiTags("Authentication")
    @ApiOkResponse({
        type: SuccessLogoutResponseDTO
    })
    @UseGuards(AuthGuard)
    @Put("logout")
    async logout(@Req() req) {
        return this.authenticationService.logout({
            user: req.user
        });
    }
}