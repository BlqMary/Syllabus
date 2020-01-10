import { Component, OnInit } from '@angular/core';
import { ICourse } from '../courses/ICourse'
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [NgbRatingConfig]
})
export class CourseComponent implements OnInit {
  course: ICourse;
  coursesService: CoursesService;
  route: ActivatedRoute;
  location: Location;
  
  set rating(value: any){
    console.log("asdasdsa :)");
    if (this.canVote())
    {
      this.course.rating = ((this.course.rating * this.course.rateCount) + value )/(this.course.rateCount+1);
      this.course.rating = Number(this.course.rating.toFixed(2));
      this.coursesService.addVoter(this.course,this.authService.user);
    }  
  }
  
  get rating(){
    return this.course.rating;
  }

  constructor(service: CoursesService,location: Location, route: ActivatedRoute,config: NgbRatingConfig,private authService : AuthService) { 
    this.coursesService = service;
    this.route = route;
    this.location = location;
    config.max = 5;
  }

  
  ngOnInit() {
    this.getCourse();
  }

  getCourse(){
    const id = this.route.snapshot.paramMap.get('_id');
    this.coursesService.getCourse(id).then(course => this.course = course);
  }

  delete(){
    this.coursesService.deleteCourse(this.course);
  }

  addParticipant(){
    this.coursesService.addParticipant(this.course,this.authService.user);
  }

  isParticipant() : boolean {
    return !this.coursesService.canBeParticipant(this.course, this.authService.user);
  }

  canVote() : boolean {
    return this.coursesService.canVote(this.course, this.authService.user);
  }

  isCourseFull():boolean{
    return this.coursesService.isFull(this.course);
  }

}
