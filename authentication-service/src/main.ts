import 'dotenv/config';
import {
    NestFactory
} from '@nestjs/core';
import {
    AppModuleNonQueue,
    AppModule,
} from './app.module';
import {
    MicroserviceOptions,
    Transport
} from '@nestjs/microservices';
import {
    ValidationPipe
} from '@nestjs/common';

const microservicesOptions: MicroserviceOptions = {
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
};

async function bootstrap() {
    const nonQueueService = await NestFactory.create(
        AppModuleNonQueue
    );

    nonQueueService.listen(process.env.PORT);

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        microservicesOptions
    );
    app.useGlobalPipes(new ValidationPipe())
    app.listen();
}

bootstrap();
