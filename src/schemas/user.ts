import { Schema, model, Model } from "mongoose";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import validator from "validator";
import { IUserModel, IUserDocument } from "../interfaces/IUser";
import { ObjectId } from "mongodb";

export var userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        _validate: (value: string) => {
            if (!validator.isEmail(value))
                throw new Error('Invalid Email address');
        },
        get validate() {
            return this._validate;
        },
        set validate(value) {
            this._validate = value;
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    roles: [ 
        {
            type : ObjectId, 
            ref : 'role'
        }]
});

//przed zapisem, sprawdza czy hasło bylo modyfikowane i je hashujemy
userSchema.pre<IUserDocument>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 8);
    }
    next(); //nastepna funkcja ktora jest w kolejności do wykonania
});

userSchema.methods.generateAuthToken = async function() {
    const token = sign({_id: this._id}, process.env.JWT_KEY);
    this.tokens.push({token});
    await this.save();
    return token;
}

userSchema.methods.removeAuthToken = async function(token: string) {
    this.tokens = this.tokens.filter((_token) => _token.token != token);
    await this.save();
    return token;
}

userSchema.statics.findByCredentials = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user || !await compare(password, user.password)) {
        throw new Error("Login");
    }

    return user;
}

export const User: IUserModel = model<IUserDocument, IUserModel>('User', userSchema)