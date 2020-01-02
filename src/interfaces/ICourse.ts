import { Model, Document } from "mongoose"

export interface ICourse {
    name: string;
    ects: number;
    semester: number;
    classType: string;
    maxStudentsCount: number;
    rating: number;
    description: string;
    image: string;
    rateCount: number;
    participants: string [];
    voters: string [];
}

export interface ICourseDocument extends ICourse, Document{

}

export interface ICourseModel extends Model<ICourseDocument>{

}