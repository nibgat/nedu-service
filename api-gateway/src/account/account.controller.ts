import {
    Body,
    Controller,
    Post
} from "@nestjs/common";
import {
    AccountService
} from "./account.service";
import {
    TestDTO
} from "./dto/request/test.dto";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { SuccessTestResponsDTO } from "./dto/response/success.test.response.dto";

@Controller("account")
export class AccountController {
    constructor(
        private accountService: AccountService
    ) { }
    @ApiTags("Account")
    @ApiOkResponse({
        type: SuccessTestResponsDTO
    })
    @Post("test")
    async test(@Body() body: TestDTO) {
        return await this.accountService.test(body);
    }
}
