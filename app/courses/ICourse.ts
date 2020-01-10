import {CourseType} from './course-type'

export interface ICourse {
    _id: string;
    name: string;
    ects: number;
    semester: number;
    classType: CourseType;
    maxStudentsCount: number;
    rating: number;
    description: string;
    image: string;
    rateCount: number;
    participants: string [];
    voters: string [];
}