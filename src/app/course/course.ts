import {CourseType} from '../courses/course-type'
import { ICourse } from '../courses/ICourse';

export class Course implements ICourse{
    _id: string;
    rating: number = 0;
    name: string;   
    ects: number;
    semester: number;
    classType: CourseType;
    maxStudentsCount: number;
    description: string;
    image: string;
    rateCount: number = 0;
    participants: string[] = [];
    voters: string [] = [];

    constructor()
    { }

}