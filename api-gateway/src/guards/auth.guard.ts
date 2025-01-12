import {
    ExecutionContext,
    HttpException,
    CanActivate,
    HttpStatus,
    Inject
} from "@nestjs/common";
import {
    ClientProxy
} from "@nestjs/microservices";
import {
    firstValueFrom
} from "rxjs";

export class AuthGuard implements CanActivate {
    constructor(
        @Inject("AUTHENTICATION_SERVICE")
        private readonly authenticationService: ClientProxy
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        if (!req.headers.authorization) {
            throw new HttpException({
                message: "token-is-required",
                code: HttpStatus.UNAUTHORIZED
            }, HttpStatus.UNAUTHORIZED);
        }

        try {
            const validateToken = this.authenticationService.send("validateToken", {
                token: req.headers.authorization
            });

            const isAuthenticated = await firstValueFrom(validateToken);

            if (!isAuthenticated || isAuthenticated.isError) {
                throw new HttpException({
                    message: "invalid-token",
                    code: HttpStatus.UNAUTHORIZED
                }, HttpStatus.UNAUTHORIZED);
            }

            req.user = {
                ...isAuthenticated,
                token: req.headers.authorization
            };

            return true;
        } catch (err) {
            throw new HttpException({
                message: "invalid-token",
                code: HttpStatus.UNAUTHORIZED
            }, HttpStatus.UNAUTHORIZED);
        }
    }
}
