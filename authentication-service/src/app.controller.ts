import {
    Controller,
    Get
} from "@nestjs/common";
import {
    AppService
} from "./app.service";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService
    ) { }

    @Get()
    getHealthCheck(): string {
        return this.appService.healthCheck();
    }
}

@Controller()
export class AppServiceController {
    constructor(
        private readonly appService: AppService
    ) { }

    @Get()
    healthCheck(): string {
        return this.appService.healthCheck();
    }
}
