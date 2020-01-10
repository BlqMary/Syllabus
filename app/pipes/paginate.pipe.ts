import { Pipe, PipeTransform } from '@angular/core';

import { ICourse } from '../courses/ICourse';

@Pipe({ name: 'paginate',
        pure:false
      })
export class PaginatePipe implements PipeTransform {
  transform(courses: ICourse[], itemsPerPage: number, pageNumber: number) {
    
    var result: ICourse[];
    result = [];
    var start = itemsPerPage*(pageNumber-1); 
    var end = itemsPerPage*pageNumber;
    

    while(start < end){
        if(courses[start])
        result.push(courses[start]);
        start++;
    }

    courses = result;
    return courses;
  }
}