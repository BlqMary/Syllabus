import { Component, Output, EventEmitter } from '@angular/core';
import {Course} from '../course/course'
import {SearchService} from '../services/search.service'

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css']
})
export class CourseSearchComponent {
  searchService : SearchService;
  searchCourse = new Course();

  constructor(service: SearchService ) { 
    this.searchService = service;
  }

  onSubmit() {
    this.searchService.postSearch(this.searchCourse);
  }


}
