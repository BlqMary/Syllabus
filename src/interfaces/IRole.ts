import { Document, Model } from "mongoose"
import { ObjectID } from "mongodb"

export interface IRole {
    name: string,
    users: [ObjectID]
}

export interface IRoleDocument extends IRole, Document{
    getUsersInRole(): void; //dobra funkcja
}

export interface IRoleModel extends Model<IRoleDocument>{

}