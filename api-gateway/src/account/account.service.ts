import {
    Inject,
    Injectable
} from "@nestjs/common";
import {
    ClientProxy
} from "@nestjs/microservices";
import { TestDTO } from "./dto/request/test.dto";

@Injectable()
export class AccountService {
    constructor(
        @Inject("ACCOUNT_SERVICE")
        private accountService: ClientProxy
    ) { }

    async test(args: TestDTO) {
        return this.accountService.send("test", {
            ...args
        });
    }
} { }
