import { Service } from "typedi";

@Service()
export class UserService {
    constructor() {}

    async getUsers() {
        console.log("hello world!");
    }
}