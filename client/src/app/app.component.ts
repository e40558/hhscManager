import { Component, OnInit } from '@angular/core';
import { Observable, map } from "rxjs";
import { User } from 'src/model/user';
import { faBars, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './auth/service/auth.service';
import { AuthState } from './auth/reducers';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { login, logout } from './auth/auth.actions';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  
  

  loading = true;
  isLoggedIn$: Observable<boolean> = new Observable<boolean>;
  isLoggedOut$: Observable<boolean> = new Observable<boolean>;
  user$: Observable<User> = new Observable<User>;
  toggleActive = false;
  title = 'css';
  // faXmark = faXmark;
  faChevronCircleRight = faChevronCircleRight;
  faBars = faBars;

  constructor(private authService: AuthService,
    private router: Router,
    private httpClient:HttpClient,
    private store: Store<AppState>) {

  }

  ngOnInit() {
   
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    const userProfile = localStorage.getItem("user");

    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }

    this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn)
      )

    this.isLoggedOut$ = this.store
      .pipe(
        select(isLoggedOut)
      )
  }


 

  toggle() {
    if (this.toggleActive == true) {
      this.toggleActive = false
    }
    else {
      this.toggleActive = true
    }

  }

  logout() {

    // this.authService.logout().subscribe();
    this.store.dispatch(logout())

  }

}