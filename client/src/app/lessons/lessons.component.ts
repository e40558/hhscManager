import {of as observableOf, Observable} from 'rxjs';

import {catchError, tap} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {Lesson} from "../model/lesson";
import { AuthService } from '../service/auth.service';
import { LessonsService } from '../service/lessons.service';

@Component({
    selector: 'lessons',
    templateUrl: './lessons.component.html',
    styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {


    lessons$: Observable<Lesson[]> = new Observable<Lesson[]>() ;
    isLoggedIn$: Observable<boolean> = new Observable<boolean>() ;
    constructor(private lessonsService: LessonsService, private authService: AuthService) {

    }

    ngOnInit() {
        this.lessons$ = this.lessonsService.loadAllLessons().pipe( ),tap(lesson => console.log('testing'))
        this.isLoggedIn$ = this.authService.isLoggedIn$;
    }

}
