import { HttpStatus } from "@nestjs/common";
import {
    r as rethinkdb
} from "rethinkdb-ts";
import { TestDTO } from "src/account/dto/test.dto";

const test = async (args: TestDTO, services: {
    r: typeof rethinkdb
}
) => {
    const user = {
        fullName: args.fullName,
        mail: args.mail
    }
    let res
    await services.r.db("nibgat").table("users").insert(user).run().then(() => {
        res = {
            message: "user insert success",
            code: HttpStatus.OK
        }
    }).catch((e) => {
        res = {
            message: e.message,
            code: HttpStatus.INTERNAL_SERVER_ERROR
        }
    })
    return res
};

export default test;
