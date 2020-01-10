import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoursesComponent} from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { CoursesService } from './services/courses.service';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseFormComponent } from './form/course-form.component';
import { FormsModule }   from '@angular/forms';
import { CourseSearchComponent } from './search/course-search.component';
import { CourseSearchPipe } from './pipes/courses-search.pipe';
import { PaginatePipe } from './pipes/paginate.pipe'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth'
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { RegistrationComponent } from './registration/registration.component';
import { LoggingComponent } from './logging/logging.component';
import { EditComponent } from './edit/edit.component';
import { PaginationComponent } from './app-pagination/app-pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
    NavbarComponent,
    CourseFormComponent,
    CourseSearchComponent,
    CourseSearchPipe,
    PaginatePipe,
    PageNotFoundComponent,
    RegistrationComponent,
    LoggingComponent,
    EditComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [
    CoursesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
