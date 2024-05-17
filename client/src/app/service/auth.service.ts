
import {filter} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject} from "rxjs";
import * as auth0 from 'auth0-js';
import {Router} from "@angular/router";
import { User } from 'src/model/user';
import * as moment from "moment";

export const ANONYMOUS_USER: User = {
    id: undefined,
    email: '',
    firstName: '',
    lastName: '',
    roles: []
};

const AUTH_CONFIG = {
      domain: 'hhcsmanager.us.auth0.com',
      clientId: '8hDA3xXHUTiotXzLiwGEVspcNFIYsoOn',
};


@Injectable()
export class AuthService {
    

    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.clientId,
        domain: AUTH_CONFIG.domain,
        responseType: 'token id_token',
        redirectUri: 'https://localhost:4200/lessons'
    });


   

    private userSubject = new BehaviorSubject<User | undefined>(undefined);

    user$: Observable<User | undefined> = this.userSubject.asObservable().pipe(filter(user => !!user));

    constructor(private http: HttpClient, private router: Router) {

    }

    login() {
      this.auth0.authorize();
    }

    signUp() {

    }

    logout() {
        
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        this.router.navigate(['/lessons']);
 
    }

    public isLoggedIn() {
        console.log(moment().isBefore(this.getExpiration(),'second'))

       return moment().isBefore(this.getExpiration(),'second');

    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    retrieveAuthInfoFromUrl() {
        this.auth0.parseHash((err,authResult)=>{
            if(err) {
                console.log("Could not parse the hash", err)
            }
            else if(authResult && authResult.idToken){
            window.location.hash = '';
            console.log("Authentication successful, authResults: ", authResult);
            this.setSession(authResult);
        }
        });
       
      }


      getExpiration(){
        const expriration = JSON.stringify(localStorage.getItem("expires_at"));
        const expiresAt= JSON.parse(expriration);
      
        return moment(expiresAt);
      }
    setSession(authResult: any) { 
      const expiresAt= moment().add(authResult.expiresIn,'second');
      
      localStorage.setItem('id_token', authResult.idToken);

      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

}