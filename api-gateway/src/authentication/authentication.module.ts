import "dotenv/config";
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
    ClientsModule, Transport
} from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: "AUTHENTICATION_SERVICE",
                transport: Transport.RMQ,
                options: {
                    urls: [
                        process.env.RMQ_ADDRESS
                    ],
                    queue: process.env.AUTHENTICATION_SERVICE_RMQ_QUEUE,
                    queueOptions: {
                        durable: false
                    }
                }
            }
        ])
    ],
    controllers: [
        AuthenticationController
    ],
    providers: [
        AuthenticationService
    ],
})
export class AuthenticationModule { }