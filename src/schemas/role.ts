import { Schema, model } from "mongoose";
import { IRoleModel, IRoleDocument } from "../interfaces/IRole";
import { ObjectId } from "mongodb";

export var roleSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    users: [ 
        {
            type : ObjectId, 
            ref : 'user'
        }]
});

roleSchema.pre<IRoleDocument>('save', async (next) => next());

export const Role: IRoleModel = model<IRoleDocument, IRoleModel>('Role', roleSchema)