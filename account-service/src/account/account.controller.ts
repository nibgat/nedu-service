import {
    Controller
} from "@nestjs/common";
import {
    AccountService
} from "./account.service";
import {
    MessagePattern
} from "@nestjs/microservices";
import { TestDTO } from "./dto/test.dto";


@Controller("account")
export class AccountController {
    constructor(
        private accountService: AccountService
    ) { }

    @MessagePattern("test")
    async test(args: TestDTO) {
        return await this.accountService.test(args);
    }

}
