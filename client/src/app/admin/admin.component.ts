import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  form:FormGroup;

  constructor(
      private fb:FormBuilder,
      private authService: AuthService,
      private router: Router) {

      this.form = this.fb.group({
          userEmail: ['student@gmail.com',Validators.required]
      });
  }


  loginAsUser() {

      const val = this.form.value;

      if (val.userEmail) {
          this.authService.loginAsUser(val.userEmail)
              .subscribe(
                  user => {
                      console.log("Logged in as user with email " + user.email);
                      this.router.navigateByUrl('/');
                  }
              );
      }
  }

}
