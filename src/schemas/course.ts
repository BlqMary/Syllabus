import { Schema, model } from "mongoose";
import { ICourseDocument, ICourseModel } from "src/interfaces/ICourse";
import { ObjectID } from "mongodb";

export var courseSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    ects: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    classType: {
        type: String,
        required: true
    },
    maxStudentsCount: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    image: {
        type:String,
        required: true
    },
    rateCount:{
        type: Number,
        required:true,
    },
    participants: [
        {
            type: String,
            required: false
        }
    ],
    voters: [
        {
            type: String,
            required: false
        }
    ]
});

courseSchema.pre<ICourseDocument>('save', async (next) => next());

export const Course: ICourseModel = model<ICourseDocument, ICourseModel>('Course', courseSchema)