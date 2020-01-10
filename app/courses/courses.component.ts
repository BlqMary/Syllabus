import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { ICourse } from './ICourse'
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  searchCourse:ICourse;
  courses: ICourse[];
  selectedCourse: ICourse;
  activePage: number = 1;  
  itemsPerPage: number = 6; 


  constructor(private coursesService: CoursesService,private searchService : SearchService) { 
    }

  displayActivePage(activePageNumber:number){  
    this.activePage = activePageNumber  
  }  

  changeItemPerPageCount(newCount : number){
    this.itemsPerPage = newCount;
  }

  onSelect(course: ICourse): void {
    this.selectedCourse = course;
  }

  ngOnInit() {
    this.initCourses();
  }

  initCourses(){
    this.coursesService.getCourses().then( courses => {
      this.courses = courses;
    })
  }

  onDeleteCourse(){
    this.coursesService.deleteCourse(this.selectedCourse);
    this.selectedCourse = null;
  }

  ngDoCheck(): void {
    this.searchCourse = this.searchService.getSearch();
  }
}
