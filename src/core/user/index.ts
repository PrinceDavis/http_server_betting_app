import {ObjectsHelpers} from "../../ports/helpers/commons/objects";

export type UserParams = {
    _id?: string;
    username: string;
    email: string;
    [key: string]: any
};

export default class User {
    _id?: string;
    username?: string;
    email?: string;
    password?: string

    constructor(params: UserParams) {
        Object.assign(this, params);
    }

    get data(): Partial<UserParams> {
        return ObjectsHelpers.extractAttributesToData(this)
    }

    get cache_account_balance_last_updated(): string {
        return `USER:${this._id}:ACCOUNT_BALANCE:LAST_UPDATED`
    }

    get dataMini(): Partial<UserParams> {
        const fieldsToRemove = ["password"]
        const data_ = this.data;
        for (let field of fieldsToRemove) {
            delete data_[field]
        }
        return data_
    }
}