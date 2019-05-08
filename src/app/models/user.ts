import { Kwetter } from "./kwetter";
import { Role } from "./role";

export class User {
    public id: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public dateOfBirth: string;
    public bio: string;
    public location: string;
    public profilePicture: string;
    public role: Role;
    public following: User[];
    public followers: User[];
    public kwetters: Kwetter[];

    constructor(id: string, email: string, firstName: string,
                lastName: string, username: string, dateOfBirth: string,
                bio: string, location: string, profilePicture: string,
                role: Role, following: User[], followers: User[], kwetters: Kwetter[]) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = username;
        this.dateOfBirth = dateOfBirth;
        this.bio = bio;
        this.location = location;
        this.profilePicture = profilePicture;
        this.role = role;
        this.following = following;
        this.followers = followers;
        this.kwetters = kwetters;
    }
}
