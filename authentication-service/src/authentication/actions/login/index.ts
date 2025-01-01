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
    const _user = await services.r
        .db("nedu")
        .table("users")
        .filter(
            services.r
                .row('mail')
                .eq(args.mail)
                .and(
                    services.r
                        .row('password')
                        .eq(args.password)
                )
        ).run();

    const user = _user[0]

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
        userID: user._id,
        mail: user.mail
    }, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: "30d"
    });

    let userRefreshToken = user.refreshToken ? user.refreshToken : refreshToken;

    await services.cacheManager.set(`${user.id.toString()}-${accessTokenID}`, accessToken, "EX", 14400);


    await services.r
        .db("nedu")
        .table("users")
        .filter({
            id: user.id
        })
        .update({
            refreshToken: userRefreshToken
        })
        .run();

    return {
        refreshToken: userRefreshToken,
        fullName: user.fullName,
        phone: user.phone,
        mail: user.mail,
        accessToken,
        id: user.id
    }
};

export default login;