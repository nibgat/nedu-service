import {
    Module
} from "@nestjs/common";
import {
    AppServiceController,
    AppController
} from "./app.controller";
import {
    AppService
} from "./app.service";
import {
    AuthenticationModule
} from "./authentication/authentication.module";

@Module({
    imports: [
        AuthenticationModule
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
