import {
    HttpStatus
} from "@nestjs/common";
import {
    r as rethinkdb
} from "rethinkdb-ts";
import {
    RegisterDTO
} from "src/authentication/dto/register.dto";

const register = async (args: RegisterDTO, services: {
    r: typeof rethinkdb
}) => {
    console.log("registered")
    return {
        message: "succes",
        code: HttpStatus.ACCEPTED
    }
};

export default register;