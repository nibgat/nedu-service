import {
    Module
} from "@nestjs/common";
import {
    AppController
} from "./app.controller";
import {
    AppService
} from "./app.service";
import {
    AuthenticationModule
} from "./authentication/authentication.module";
import {
    AccountModule
} from "./account/account.module";

@Module({
    imports: [
        AuthenticationModule,
        AccountModule,
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService
    ]
})
export class AppModule { }
