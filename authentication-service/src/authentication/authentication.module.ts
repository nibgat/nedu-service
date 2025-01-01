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
import cacheProvider from "./cache/cache.provider";

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
        ...databaseProviders,
        cacheProvider
    ],
    exports: [
        ...databaseProviders,
        cacheProvider
    ]
})
export class AuthenticationModule { }