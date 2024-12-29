import {
    Injectable,
    Inject
} from "@nestjs/common";
import {
    r as rethinkdb
} from "rethinkdb-ts";
import {
    test
} from "./actions";
import { TestDTO } from "./dto/test.dto";

@Injectable()
export class AccountService {
    constructor(
        @Inject("RETHINKDB_CONNECTION")
        private r: typeof rethinkdb,
    ) { }

    async test(args: TestDTO) {
        return await test(args, {
            r: this.r
        });
    }

} { }
