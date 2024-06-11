import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button'
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LocationComponent } from './location/location.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonsService } from './service/lessons.service';
import { AdminComponent } from './admin/admin.component';
import { RbacAllowDirective } from './common/rbac-allow.directive';
import { Router } from '@angular/router';
import { AuthorizationGuard } from './service/auth.guard';



export function createAdminOnlyGuard(authService:AuthService, router:Router) {
  return new AuthorizationGuard(['ADMIN'], authService, router);
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AboutComponent,
    LocationComponent,
    LessonsComponent,
    AdminComponent,
    RbacAllowDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'x-xsrf-token'
  }),
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [LessonsService,
    AuthService,
    {
        provide: 'adminsOnlyGuard',
        useFactory: (authService:AuthService,
                     router:Router) =>
            new AuthorizationGuard(['ADMIN'], authService, router),
        deps: [
          AuthService,Router
        ]
     }
 ],
              
  bootstrap: [AppComponent]
})
export class AppModule { }
