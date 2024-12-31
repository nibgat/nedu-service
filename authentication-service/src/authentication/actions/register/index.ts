import {
    HttpStatus
} from "@nestjs/common";
import {
    r as rethinkdb
} from "rethinkdb-ts";
import {
    RegisterDTO
} from "src/authentication/dto/register.dto";
import {
    formattedName
} from "src/authentication/utils";

const register = async (args: RegisterDTO, services: {
    r: typeof rethinkdb
}) => {
    if (args.phone[0] === "0") {
        args.phone = args.phone.slice(1);
    }

    const existingUser = await services.r
        .db("nedu")
        .table("users")
        .filter(
            services.r
                .row('mail')
                .eq(args.mail)
                .or(
                    services.r
                        .row('phone')
                        .eq(args.phone)
                )
        ).run();

    if (existingUser && existingUser.length) {
        return {
            isError: true,
            message: "user-informations-already-in-use",
            code: HttpStatus.CONFLICT
        };
    }

    const user = {
        mail: args.mail.trim(),
        fullName: formattedName(args.fullName),
        phone: args.phone.trim(),
        password: args.password.trim()
    };

    await services.r.db("nedu").table("users").insert(user).run()
    return {
        message: "register-success",
        code: HttpStatus.OK
    };
};

export default register;