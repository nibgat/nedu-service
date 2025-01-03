import {
    Injectable,
    Inject,
} from "@nestjs/common";
import {
    ClientProxy
} from "@nestjs/microservices";
import {
    RefreshTokenDTO
} from "./dto/request/refresh.token.dto";
import {
    RegisterDTO
} from "./dto/request/register.dto";
import {
    LoginDTO
} from "./dto/request/login.dto";

@Injectable()
export class AuthenticationService {
    constructor(
        @Inject("AUTHENTICATION_SERVICE")
        private authenticationService: ClientProxy
    ) { }

    async register(args: RegisterDTO) {
        return this.authenticationService.send("register", {
            ...args
        });
    }

    async login(args: LoginDTO) {
        return this.authenticationService.send("login", {
            ...args
        });
    }

    async refreshToken(args: RefreshTokenDTO) {
        return this.authenticationService.send("refreshToken", {
            ...args
        });
    }
} { }