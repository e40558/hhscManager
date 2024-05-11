
import {map, shareReplay, tap} from 'rxjs/operators';

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Lesson } from '../model/lesson';


@Injectable()
export class LessonsService {

    constructor(private http: HttpClient) {

    }

    loadAllLessons() : Observable<Lesson[]> {
        return this.http.get<any>('/api/lessons').pipe(
            map(res => res.lessons),
           shareReplay())
         
    }

    findLessonById(id:number) {
        return this.http.get<Lesson>('/api/lessons/' + id);
    }

}