import { Service } from "typedi";

@Service()
export class IndexService {
    constructor() {}

    async getUsers() {
        console.log("hello world!");
    }
}