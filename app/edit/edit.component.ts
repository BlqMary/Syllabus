import { Component, OnInit,Input } from '@angular/core';
import { ICourse } from '../courses/ICourse';
import { CoursesService } from '../services/courses.service';
import {CourseType} from '../courses/course-type';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { Course } from '../course/course';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  coursesType: string[] = Object.keys(CourseType);
  course : ICourse;
  location: Location;
  message: String;
  

  constructor(private service : CoursesService,private route: ActivatedRoute, location: Location, private router : Router) { 
    this.location = location;
  }

  ngOnInit() {
    this.getCourse();
    this.course = new Course();
  }

  getCourse(){
    const id = this.route.snapshot.paramMap.get('_id');
    this.service.getCourse(id).then(course => this.course = course);
  }

  onSubmit(){
    this.service.editCourse(this.course);
    this.message = "Kurs został zaktualizowany";
  }

}
