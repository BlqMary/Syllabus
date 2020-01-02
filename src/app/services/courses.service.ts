import {Injectable} from '@angular/core'
import {MockData} from '../courses/mock-course-data'
import { of ,Observable} from 'rxjs';
import { ICourse } from '../courses/ICourse';
import { MyUser } from './auth.service';
import {HttpClient } from '@angular/common/http';
import { Course } from '../course/course';
import { CourseType } from '../courses/course-type';

@Injectable({providedIn: 'root'})
export class CoursesService{

    constructor(private http: HttpClient){
    }

    getCourses() : Promise<ICourse[]>{
        MockData.Courses.forEach(course => this.addCourse(course));
        return this.http.get<ICourse[]>("http://localhost:3000/courses").toPromise();

    }

    getCourse(courseId: string): Promise<ICourse>{
        return this.http.post<ICourse>("http://localhost:3000/course/find",{
            "id": courseId
        }).toPromise()
    }

    addCourse(course: ICourse){
        this.http.post("http://localhost:3000/course/add",course).toPromise();
    }

    deleteCourse(course: ICourse){ 
        this.http.post("http://localhost:3000/course/delete",{
            "id": course._id
        }).toPromise()
    }

    editCourse(edited: ICourse){
        this.http.post("http://localhost:3000/course/update",edited).toPromise();
    }

    addParticipant(course: ICourse, participant: MyUser) {
        if(this.canBeParticipant(course, participant))
        {
            course.participants.push(participant.email);
            this.http.post("http://localhost:3000/course/update",course).toPromise();
        }
    }

    canBeParticipant(course: ICourse, participant: MyUser) : boolean {
        return !(course.participants.find(email => email == participant.email));
    }

    addVoter(course: ICourse, voter: MyUser) {
        if(this.canVote(course, voter))
        {
            course.voters.push(voter.email);
            this.http.post("http://localhost:3000/course/update",course).toPromise();
        }
    }

    canVote(course: ICourse, voter: MyUser) : boolean {
        return !((course.voters.find(email => email == voter.email) || this.canBeParticipant(course,voter)));
    }

    isFull(course: ICourse):boolean{
        return(course.participants.length == course.maxStudentsCount);
    }
}