import dotenv from "dotenv";
import path from "path";


// Environmental Variables

export default class AppConfig {
    static REFRESH_TOKEN_EXPIRY_SECS = 86400
    static ACCESS_TOKEN_EXPIRY_SECS = 3600

    static initiate() {
        dotenv.config({
            path: path.resolve(__dirname, `../../.env`)
        });
    }

    static get DATABASE_URL(): string {
        return process.env.EXPRESS_APP_DATABASE_URL as string
    }

    static get SECRET_KEY(): string {
        return process.env.EXPRESS_APP_SECRET_KEY as string
    }

    static get PRIVATE_ENDPOINT_SECRET_KEY(): string {
        return process.env.EXPRESS_APP_PRIVATE_ENDPOINT_SECRET_KEY as string
    }

    static get API_VERSION(): number {
        return Number.parseInt(process.env.EXPRESS_APP_API_VERSION || '1')
    }

    static get SERVER_PORT(): string {
        return process.env.EXPRESS_APP_SERVER_PORT as string || '3000'
    }


    static get REDIS_URL(): string {
        return process.env.EXPRESS_APP_REDIS_URL as string
    }

    static get MESSAGE_QUEUE_NAME_WS_SERVICE(): string {
        return process.env.EXPRESS_APP_MESSAGE_QUEUE_NAME_WEBSOCKET_SERVICE as string
    }

    static get ACTIVE_GAMES_COUNT(): number {
        return Number.parseInt(process.env.EXPRESS_APP_ACTIVE_GAMES_COUNT || '10')
    }


}