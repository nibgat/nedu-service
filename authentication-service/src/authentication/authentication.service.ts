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
    register
} from "./actions";

@Injectable()
export class AuthenticationService {
    constructor(
        @Inject("RETHINKDB_CONNECTION")
        private r: typeof rethinkdb,
    ) { }

    async register(args: RegisterDTO) {
        return await register(args, {
            r: this.r
        });
    }

} { }