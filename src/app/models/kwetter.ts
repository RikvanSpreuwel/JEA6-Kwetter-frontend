import { User } from "./user";

export class Kwetter {
    public id: string;
    public message: string;
    public postedOn: string;
    public author: User;

    constructor(id: string, message: string,
                postedOn: string, author: User) {
        this.id = id;
        this.message = message;
        this.postedOn = postedOn;
        this.author = author;
    }
}
