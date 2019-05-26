import { User } from "./user";

export class Kwetter {
    public kwetterId: string;
    public message: string;
    public postedOn: string;
    public author: User;

    constructor(kwetterId: string, message: string,
                postedOn: string, author: User) {
        this.kwetterId = kwetterId;
        this.message = message;
        this.postedOn = postedOn;
        this.author = author;
    }
}
