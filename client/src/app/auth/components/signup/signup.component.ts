import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'winston';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  form:FormGroup;

  errors:string[] = [];

  messagePerErrorCode = {
      min: 'The minimum length is 10 characters',
      uppercase: 'At least one upper case character',
      digits: 'At least one numeric character',
      "err_user": 'Could not create user'
  };


  constructor(private fb: FormBuilder, private authService: AuthService,
                  private router:Router) {
      this.form = this.fb.group({
          email: ['test@gmail.com',Validators.required],
          firstName: ['andre',Validators.required],
          lastName: ['mccaskill',Validators.required],
          password: ['Password10',Validators.required],
          confirm: ['Password10',Validators.required]
      });
  }


  ngOnInit() {

  }


  signUp() {
      const val = this.form.value;

      if (val.email && val.password && val.password === val.confirm) {

          this.authService.signUp(val.email, val.password, val.firstName, val.lastName)
              .subscribe(
                 {
                    next:()=>{
                        this.router.navigateByUrl('/');
                        console.log("User created successfully")
                    },
                    error:(response)=>{this.errors = response.error.errors},               

                 }
              );

      }

  }
}