import "dotenv/config";
import {
    NestFactory
} from "@nestjs/core";
import {
    AppModule
} from "./app.module";
import {
    DocumentBuilder,
    SwaggerModule
} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(
        AppModule
    );

    const options = new DocumentBuilder()
        .setTitle("Nibgat | API Gateway")
        .setDescription("Nibgat - Service")
        .setVersion("1.0.0")
        .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup("api/v1", app, document);

    app.enableCors({
        credentials: true,
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: [
            "Content-Type",
            "Accept",
            "Authorization",
            "authorization",
            "Referer",
            "referer"
        ]
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
