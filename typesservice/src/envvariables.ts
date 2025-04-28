import 'dotenv/config';

const envs = process.env;
export const envvariables = {
    urldb:envs.URL_DB as string,
    dev:envs.MODE_DEV=='dev',
    port:envs.PORT ?? 3000,
    jwtkey:envs.JWT_KEY
}