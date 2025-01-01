import {
    Injectable,
    Inject
} from "@nestjs/common";
import Redis from "ioredis";
import {
    r as rethinkdb
} from "rethinkdb-ts";
import {
    JwtService
} from "@nestjs/jwt";
import {
    ValidateTokenDTO
} from "./dto/validate.token.dto";
import {
    RefreshTokenDTO
} from "./dto/refresh.token.dto";
import {
    RegisterDTO
} from "./dto/register.dto";
import {
    LoginDTO
} from "./dto/login.dto";
import {
    validateToken,
    refreshToken,
    register,
    login
} from "./actions";

@Injectable()
export class AuthenticationService {
    constructor(
        @Inject("RETHINKDB_CONNECTION")
        private r: typeof rethinkdb,

        private jwtService: JwtService,

        @Inject("CACHE_SERVICE")
        private cacheManager: Redis
    ) { }

    async register(args: RegisterDTO) {
        return await register(args, {
            r: this.r
        });
    }

    async login(args: LoginDTO) {
        return await login(args, {
            cacheManager: this.cacheManager,
            jwtService: this.jwtService,
            r: this.r
        });
    }

    async validateToken(args: ValidateTokenDTO) {
        return await validateToken(args, {
            cacheManager: this.cacheManager,
            jwtService: this.jwtService
        });
    }

    async refreshToken(args: RefreshTokenDTO) {
        return await refreshToken(args, {
            cacheManager: this.cacheManager,
            jwtService: this.jwtService,
            r: this.r
        });
    }
} { }