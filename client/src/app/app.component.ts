import {Component, OnInit} from '@angular/core';
import {Observable, map} from "rxjs";
import { User } from 'src/model/user';
import { faBars ,faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './auth/service/auth.service';
import { AuthState } from './auth/reducers';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

    

    isLoggedIn$: Observable<boolean> = new Observable<boolean>;
    isLoggedOut$: Observable<boolean> = new Observable<boolean>;
    user$: Observable<User> =new Observable<User>;
    toggleActive = false;  
    title = 'css';
   // faXmark = faXmark;
    faChevronCircleRight=faChevronCircleRight;
    faBars=faBars;

    constructor(private authService:AuthService, private store:Store<AppState>) {

    }

    ngOnInit() {
       // this.isLoggedIn$ = this.authService.isLoggedIn$;
       // this.isLoggedOut$ = this.authService.isLoggedOut$;
       // this.user$ = this.authService.user$;

       //this.store.subscribe(state => console.log("store value", state));

       this.isLoggedIn$ = this.store 
                .pipe(
                  select(isLoggedIn)
                )
                
      this.isLoggedOut$ = this.store 
                .pipe(
                  select(isLoggedOut)
                )
    }


    
  
  
    toggle(){
      if(this.toggleActive==true){
        this.toggleActive= false
      }
      else{
        this.toggleActive=true
      }
     
    }

    logout() {

       // this.authService.logout().subscribe();
       this.store.dispatch(logout())

    }

}