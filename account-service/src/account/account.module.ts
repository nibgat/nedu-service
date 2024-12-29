import {
    Module
} from "@nestjs/common";
import {
    AccountService
} from "./account.service";
import {
    AccountController
} from "./account.controller";
import {
    databaseProviders
} from "./database/database.providers";

@Module({
    imports: [
    ],
    controllers: [
        AccountController
    ],
    providers: [
        AccountService,
        ...databaseProviders
    ],
    exports: [
        ...databaseProviders
    ]
})
export class AccountModule { }