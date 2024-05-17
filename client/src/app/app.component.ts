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

    constructor(public auth:AuthService) {

    }

    ngOnInit() {
      this.auth.retrieveAuthInfoFromUrl()
       
    }


    
  
  
    toggle(){
      if(this.toggleActive==true){
        this.toggleActive= false
      }
      else{
        this.toggleActive=true
      }
     
    }

    signUp() {
      this.auth.signUp();
  }

  login() {
      
      this.auth.login();

  }

  logout() {
      this.auth.logout();
  }

}