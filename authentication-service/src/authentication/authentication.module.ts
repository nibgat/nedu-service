import {
    Module
} from "@nestjs/common";
import {
    AuthenticationService
} from "./authentication.service";
import {
    AuthenticationController
} from "./authentication.controller";
import {
    databaseProviders
} from "./database/database.providers";

@Module({
    imports: [
    ],
    controllers: [
        AuthenticationController
    ],
    providers: [
        AuthenticationService,
        ...databaseProviders
    ],
    exports: [
        ...databaseProviders
    ]
})
export class AuthenticationModule { }