import { IUser } from "./users.interface";

export interface ILogin {
    username: string;
    password: string;
}

export interface IRespLogin {
    msg:    string;
    status: number;
    fullname: string;
    rol:   string;
    token:  string;
}