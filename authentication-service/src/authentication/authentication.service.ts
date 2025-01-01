import {
    Injectable,
    Inject
} from "@nestjs/common";
import {
    r as rethinkdb
} from "rethinkdb-ts";
import {
    RegisterDTO
} from "./dto/register.dto";
import {
    LoginDTO
} from "./dto/login.dto";
import {
    register,
    login
} from "./actions";
import {
    JwtService
} from "@nestjs/jwt";
import Redis from "ioredis";

@Injectable()
export class AuthenticationService {
    constructor(
        @Inject("RETHINKDB_CONNECTION")
        private r: typeof rethinkdb,
        private jwtService: JwtService,
        @Inject("CACHE_SERVICE")
        private redis: Redis
    ) { }

    async register(args: RegisterDTO) {
        return await register(args, {
            r: this.r
        });
    }

    async login(args: LoginDTO) {
        return await login(args, {
            jwtService: this.jwtService,
            r: this.r
        });
    }

} { }