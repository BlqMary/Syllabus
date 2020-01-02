import { Component } from '@angular/core';
import {Course} from '../course/course'
import {CourseType} from '../courses/course-type'
import{FormsModule } from '@angular/forms'
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {
  coursesType: string[] = Object.keys(CourseType);
  model = new Course();
  
  constructor(private coursesService: CoursesService, private router: Router) { 
  }

  onSubmit() 
  {
    this.coursesService.addCourse(this.model);
    this.router.navigateByUrl('/detail/' + this.model.name);
  }

}
