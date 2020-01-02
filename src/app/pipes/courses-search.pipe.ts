import { Pipe, PipeTransform } from '@angular/core';

import { ICourse } from '../courses/ICourse';

@Pipe({ name: 'courseSearch',
        pure:false
      })
export class CourseSearchPipe implements PipeTransform {
  transform(courses: ICourse[], search: ICourse) {
    if (!search)
      return courses;
    if(!courses) return [];
    if(search.name) courses = courses.filter(course => course.name.includes(search.name));
    if(search.ects && search.ects != 0) courses = courses.filter(course => course.ects == search.ects);
    if(search.semester && search.semester != 0) courses = courses.filter(course => course.semester == search.semester);
    if(search.rating && search.rating != 0) courses = courses.filter(course => course.rating > search.rating);
    return courses;
  }
}
