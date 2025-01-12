import {
    HttpStatus
} from "@nestjs/common";
import Redis from "ioredis";
import {
    r as rethinkdb
} from "rethinkdb-ts";
import {
    ContextDTO
} from "src/authentication/dto/context.dto";
import {
    LogoutDTO
} from "src/authentication/dto/logout.dto";

const logout = async (args: LogoutDTO, services: {
    r: typeof rethinkdb;
    cacheManager: Redis;
}, context: ContextDTO) => {
    const user = context.user;

    await services.cacheManager.del(`${user.userID}-${user.tokenID}`);

    await services.r
        .db("nedu")
        .table("users")
        .get(user.userID)
        .update({
            refreshToken: ""
        })
        .run();

    return {
        code: 200,
        message: "user-successfully-logged-out"
    };
}

export default logout;