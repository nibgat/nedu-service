import {
    HttpStatus
} from "@nestjs/common";
import {
    r as rethinkdb
} from "rethinkdb-ts";
import {
    randomUUID
} from "crypto";
import {
    LoginDTO
} from "src/authentication/dto/login.dto";
import {
    JwtService
} from "@nestjs/jwt";
import Redis from "ioredis";

const login = async (args: LoginDTO, services: {
    jwtService: JwtService;
    cacheManager: Redis;
    r: typeof rethinkdb;
}) => {
    const user = await services.r
        .db("nedu")
        .table("users")
        .filter({
            mail: args.mail,
            password: args.password
        })
        .nth(0)
        .run();

    if (!user) {
        return {
            isError: true,
            message: "invalid-user-data",
            code: HttpStatus.CONFLICT
        };
    }

    const accessTokenID = randomUUID();

    const accessToken = services.jwtService.sign({
        fullName: user.fullName,
        tokenID: accessTokenID,
        userID: user.id,
        mail: user.mail,
    }, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: "4h"
    });

    const refreshToken = services.jwtService.sign({
        fullName: user.fullName,
        tokenID: accessTokenID,
        userID: user.id,
        mail: user.mail
    }, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: "30d"
    });

    await services.cacheManager.set(`${user.id}-${accessTokenID}`, accessToken, "EX", 14400);

    await services.r
        .db("nedu")
        .table("users")
        .get(user.id)
        .update({
            refreshToken
        })
        .run();

    return {
        accessToken,
        refreshToken,
        fullName: user.fullName,
        phone: user.phone,
        mail: user.mail,
        id: user.id
    }
};

export default login;