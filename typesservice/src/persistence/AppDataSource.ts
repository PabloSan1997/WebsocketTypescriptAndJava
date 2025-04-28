import { DataSource } from "typeorm";
import { envvariables } from "../envvariables";
import { Users } from "./entities/Users";
import { MessageEntity } from "./entities/Message";



export const AppDataSource = new DataSource({
    url:envvariables.urldb,
    type:'postgres',
    synchronize:true,
    logging:envvariables.dev,
    entities:[Users, MessageEntity]
});