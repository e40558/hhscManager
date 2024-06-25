import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CourseComponent } from './course/course.component';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { EditCourseDialogComponent } from './edit-course-dialog/edit-course-dialog.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import * as fromCoures from './reducers';


@NgModule({
  declarations: [
    CourseComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    StoreModule.forFeature(fromCoures.couresFeatureKey, fromCoures.reducers, { metaReducers: fromCoures.metaReducers })
  ]
})
export class CoursesModule { }
