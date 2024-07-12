import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CourseComponent } from './course/course.component';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { EditCourseDialogComponent } from './edit-course-dialog/edit-course-dialog.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { CoursesResolver } from './courses.resolver';
import { CoursesHttpService } from './services/courses-http.service';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './courses.effects';
import { coursesReducer } from './reducers/course.reducers';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
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
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([CoursesEffects]),
    StoreModule.forFeature("courses", coursesReducer)
 ],
 exports: [
  HomeComponent,
  CoursesCardListComponent,
  EditCourseDialogComponent,
  CourseComponent
],
providers: [
  CoursesHttpService,
  CoursesResolver
]
})
export class CoursesModule {
 
 }
