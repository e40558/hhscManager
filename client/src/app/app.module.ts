import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
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
import { LessonsComponent } from './lessons/lessons.component';
import { LessonsService } from './service/lessons.service';
import { AdminComponent } from './admin/admin.component';
import { RbacAllowDirective } from './common/rbac-allow.directive';
import { Router } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/service/auth.service';
import { AuthGuard } from './auth/service/auth.guard';
import { AuthEffects } from './auth/service/auth.effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LessonsComponent,
    AdminComponent,
    RbacAllowDirective
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot(),
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
      metaReducers,
      runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true
      }
  }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
  }),
    
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [
    LessonsService,
    AuthService
    
 ],
              
  bootstrap: [AppComponent]
})
export class AppModule { }
