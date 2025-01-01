import {
    HttpStatus
} from "@nestjs/common";
import {
    JwtService
} from "@nestjs/jwt";
import Redis from "ioredis";
import {
    ValidateTokenDTO
} from "src/authentication/dto/validate.token.dto";

const validateToken = async (args: ValidateTokenDTO, services: {
    jwtService: JwtService;
    cacheManager: Redis;
}) => {
    let tokenDecode;
    try {
        tokenDecode = await services.jwtService.verifyAsync(args.token, {
            secret: process.env.JWT_SECRET_KEY
        });
    } catch (err) {
        return {
            isError: true,
            message: "expired-token",
            code: HttpStatus.UNAUTHORIZED
        };
    }

    if (!tokenDecode || !tokenDecode.userID) {
        return {
            isError: true,
            message: "invalid-token",
            code: HttpStatus.UNAUTHORIZED
        };
    }

    const cachedToken = await services.cacheManager.get(`${tokenDecode.userID.toString()}-${tokenDecode.tokenID}`);

    if (!cachedToken) {
        return {
            isError: true,
            message: "expired-token",
            code: HttpStatus.UNAUTHORIZED
        };
    }

    if (args.token !== cachedToken) {
        return {
            isError: true,
            message: "invalid-token",
            code: HttpStatus.UNAUTHORIZED
        };
    }

    return tokenDecode;
}

export default validateToken
