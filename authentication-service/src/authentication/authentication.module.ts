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
import {
    JwtModule
} from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: "10000s",
            }
        }),
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