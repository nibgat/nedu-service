import "dotenv/config";
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
    ClientsModule, Transport
} from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: "ACCOUNT_SERVICE",
                transport: Transport.RMQ,
                options: {
                    urls: [
                        process.env.RMQ_ADDRESS
                    ],
                    queue: process.env.ACCOUNT_SERVICE_RMQ_QUEUE,
                    queueOptions: {
                        durable: false
                    }
                }
            }
        ])
    ],
    controllers: [
        AccountController
    ],
    providers: [
        AccountService
    ],
})
export class AccountModule { }