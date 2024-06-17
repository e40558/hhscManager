import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthService } from '../../service/auth.service';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { login } from '../../auth.actions';
import { AuthState } from '../../reducers';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form:FormGroup;

    messagePerErrorCode = {
        loginfailed: "Invalid credentials"
    };

    errors = [];

    constructor(private fb:FormBuilder, private authService: AuthService, private router: Router, private store: Store<AuthState>) {

        this.form = this.fb.group({
            email: ['admin@gmail.com',Validators.required],
            password: ['Password10',Validators.required]
        });

    }

    ngOnInit() {

    }

    login() {

        const val = this.form.value;

        if (val.email && val.password) {

            this.authService.login(val.email, val.password)
                  .pipe(
                    tap(user => {
                      console.log(user);
                      this.store.dispatch(login({user}))
                      this.router.navigateByUrl('/lessons');
                    })
                  )
                .subscribe(                         
                    {                       
                        error: ()=> {alert('error logging in')},                        
                    } 
                );

        }


    }

}