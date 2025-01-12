import {
    Controller
} from "@nestjs/common";
import {
    AuthenticationService
} from "./authentication.service";
import {
    ValidateTokenDTO
} from "./dto/validate.token.dto";
import {
    RefreshTokenDTO
} from "./dto/refresh.token.dto";
import {
    MessagePattern
} from "@nestjs/microservices";
import {
    RegisterDTO
} from "./dto/register.dto";
import {
    LogoutDTO
} from "./dto/logout.dto";
import {
    LoginDTO
} from "./dto/login.dto";


@Controller("authentication")
export class AuthenticationController {
    constructor(
        private authenticationService: AuthenticationService
    ) { }

    @MessagePattern("register")
    async register(args: RegisterDTO) {
        return await this.authenticationService.register(args);
    }

    @MessagePattern("login")
    async login(args: LoginDTO) {
        return await this.authenticationService.login(args);
    }

    @MessagePattern("validateToken")
    async validateToken(args: ValidateTokenDTO) {
        return await this.authenticationService.validateToken(args);
    }

    @MessagePattern("refreshToken")
    async refreshToken(args: RefreshTokenDTO) {
        return await this.authenticationService.refreshToken(args);
    }

    @MessagePattern("logout")
    async logout(args: LogoutDTO) {
        const context = args.context;
        delete args.context;

        return await this.authenticationService.logout(args, context);
    }
}