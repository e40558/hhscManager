import {Component, OnInit} from '@angular/core';
import {compareCourses, Course} from '../model/course';
import {Observable} from "rxjs";
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {map, shareReplay} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {selectAdvancedCourses, selectBeginnerCourses, selectPromoTotal} from '../courses.selectors';
import { defaultDialogConfig } from '../shared/default-dialog-config';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number> = new Observable<number>();

    beginnerCourses$: Observable<Course[]> = new Observable<Course[]>() ;

    advancedCourses$: Observable<Course[]> =new Observable<Course[]>();


    constructor(
      private dialog: MatDialog,
      private store: Store<AppState>) {

    }

    ngOnInit() {
      this.reload();
    }

  reload() {

        this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));

        this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));

        this.promoTotal$ = 
        this.store.pipe(select(selectPromoTotal));

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
