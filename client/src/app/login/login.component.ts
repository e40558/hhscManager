import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../common/forms.scss']
})
export class LoginComponent implements OnInit {

    form:FormGroup;

    messagePerErrorCode = {
        loginfailed: "Invalid credentials"
    };

    errors = [];

    constructor(private fb:FormBuilder, private authService: AuthService, private router: Router) {

        this.form = this.fb.group({
            email: ['test@gmail.com',Validators.required],
            password: ['Password10',Validators.required]
        });

    }

    ngOnInit() {

    }

    login() {

        const val = this.form.value;

        if (val.email && val.password) {        

        }


    }

}