import "dotenv/config";
import {
    Redis
} from "ioredis";
import {
    FactoryProvider
} from "@nestjs/common";

const cacheProvider: FactoryProvider<Redis> = {
    provide: "CACHE_SERVICE",
    useFactory: () => {
        const redisInstance = new Redis({
            host: process.env.REDIS_ADDRESS,
            port: Number(process.env.REDIS_PORT)
        });

        redisInstance.on("error", e => {
            throw new Error(`Redis connection failed: ${e}`);
        });

        return redisInstance;
    },
    inject: []
};
export default cacheProvider;