import {
    Controller
} from "@nestjs/common";
import {
    AuthenticationService
} from "./authentication.service";
import {
    MessagePattern
} from "@nestjs/microservices";
import {
    RegisterDTO
} from "./dto/register.dto";
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

}