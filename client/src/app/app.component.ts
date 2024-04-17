import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import { AuthService } from './service/auth.service';
import { User } from 'src/model/user';
import { faBars ,faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

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

    constructor(private authService:AuthService) {

    }

    ngOnInit() {
        this.isLoggedIn$ = this.authService.isLoggedIn$;
        this.isLoggedOut$ = this.authService.isLoggedOut$;
        this.user$ = this.authService.user$;
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

        this.authService.logout().subscribe();

    }

}