import "dotenv/config";
const rethinkdb = require("rethinkdbdash");

export const databaseProviders = [
    {
        provide: "RETHINKDB_CONNECTION",
        useFactory: (): Promise<
            typeof rethinkdb
        > => {
            const r = rethinkdb({
                servers: [
                    {
                        host: process.env.RETHINKDB_ADDRESS,
                        port: process.env.RETHINKDB_PORT
                    }
                ]
            });

            return r;
        }
    }
]; 