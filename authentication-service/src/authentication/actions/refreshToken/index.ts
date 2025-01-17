import {
    HttpStatus
} from "@nestjs/common";
import {
    JwtService
} from "@nestjs/jwt";
import {
    r as rethinkdb
} from "rethinkdb-ts";
import Redis from "ioredis";
import {
    RefreshTokenDTO
} from "src/authentication/dto/refresh.token.dto";
import {
    randomUUID
} from "crypto";

const refreshToken = async (args: RefreshTokenDTO, services: {
    jwtService: JwtService;
    r: typeof rethinkdb;
    cacheManager: Redis;
}) => {
    let validatedToken;

    const user = await services.r
        .db("nedu")
        .table("users")
        .filter({
            refreshToken: args.token
        })
        .nth(0)
        .default(null)
        .run();

    if (!user) {
        return {
            isError: true,
            message: "invalid-token",
            code: HttpStatus.NOT_ACCEPTABLE
        };
    }

    try {
        validatedToken = await services.jwtService.verifyAsync(args.token, {
            secret: process.env.JWT_SECRET_KEY
        });
    } catch (err) {
        return {
            isError: true,
            message: "expired-token",
            code: HttpStatus.NOT_ACCEPTABLE
        };
    }

    if (!validatedToken || !validatedToken.userID) {
        return {
            isError: true,
            message: "invalid-token",
            code: HttpStatus.NOT_ACCEPTABLE
        };
    }

    if (validatedToken.userID !== user.id) {
        return {
            isError: true,
            message: "user-not-found",
            code: HttpStatus.NOT_FOUND
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

    await services.cacheManager.del(`${user.id}-${validatedToken.tokenID}`);
    await services.cacheManager.set(`${user.id}-${accessTokenID}`, accessToken, "EX", 14400);

    const refreshToken = services.jwtService.sign({
        fullName: user.fullName,
        tokenID: accessTokenID,
        userID: user.id,
        mail: user.mail
    }, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: "30d"
    });

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
        refreshToken
    };
};

export default refreshToken;