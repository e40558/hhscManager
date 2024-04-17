import {shareReplay, filter, tap, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject} from "rxjs";
import { User } from 'src/model/user';

export const ANONYMOUS_USER: User = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roles: []
}


@Injectable()
export class AuthService {

    private subject:  BehaviorSubject<User>  = new BehaviorSubject<User>(ANONYMOUS_USER);

    user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));

    isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));

    isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

    constructor(private http: HttpClient) {
        http.get<User>('https://localhost:9000/api/user').pipe(
            tap(console.log))
            .subscribe(user => this.subject.next(user ? user : ANONYMOUS_USER));
    }

    signUp(email:string, password:string,lastName:string,firstName:string ) {

        return this.http.post<User>('https://localhost:9000/api/signup', {email, password, firstName,lastName}).pipe(
            shareReplay(),
            tap(user => this.subject.next(user)),);
    }

    login(email:string, password:string ) {
        return this.http.post<User>('/api/login', {email, password}).pipe(
            shareReplay(),
            tap(user => this.subject.next(user)),);
    }

    loginAsUser(email:string) {
        return this.http.post<User>('/api/admin', {email}).pipe(
            shareReplay(),
            tap(user => this.subject.next(user)),);
    }

    logout() : Observable<any> {
        return this.http.post('/api/logout', null).pipe(
            shareReplay(),
            tap(user => this.subject.next(ANONYMOUS_USER)),);
    }
}