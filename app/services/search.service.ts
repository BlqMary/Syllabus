import { Injectable } from '@angular/core';
import {Course} from '../course/course'

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  course = new Course();

  constructor() { }

  postSearch(course : Course){
    this.course = course;
  }

  getSearch(){
    return this.course;
  }


}
