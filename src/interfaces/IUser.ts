import { Document, Model } from 'mongoose'
import { ObjectID } from "mongodb"

export interface IUser{
    email: string,
    password: string,
    roles: [ObjectID]  //jak nie działa coś to przez to xD

}

export interface IUserDocument extends IUser, Document{
    generateAuthToken(): void;
    removeAuthToken(token: string): void;
}

export interface IUserModel extends Model<IUserDocument>{
    findByCredentials(email: string, password: string) : IUserDocument
}