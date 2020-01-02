import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent }  from './course/course.component';
import {CourseFormComponent} from './form/course-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { RegistrationComponent } from './registration/registration.component';
import { LoggingComponent } from './logging/logging.component';
import { AuthGuard } from './auth-guard';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'detail/:_id', component: CourseComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CoursesComponent },
  { 
    path: 'newCourse', 
    component: CourseFormComponent,
    canActivate: [AuthGuard],
    data: { isAdmin: true }    
  },
  {
    path: 'edit/:_id',
    component: EditComponent,
  },
  { 
    path: 'register',
    component: RegistrationComponent,
  },
  { path: 'login', component: LoggingComponent },
  { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }