import {
    Module
} from "@nestjs/common";
import {
    AppController,
    AppServiceController
} from "./app.controller";
import {
    AppService
} from "./app.service";
import {
    AccountModule
} from "./account/account.module";

@Module({
    imports: [
        AccountModule
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService
    ],
})
export class AppModule { }

@Module({
    imports: [],
    controllers: [
        AppServiceController
    ],
    providers: [
        AppService
    ],
})
export class AppModuleNonQueue { }
