import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FacebookService } from 'ngx-facebook';
import { NotificationsService } from 'angular2-notifications';
import { AuthenticationService, TokenInterceptor } from 'ng2-smart-auth';

import { LoaderInterceptor } from './shared/loading-spinner/loader.interceptor';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HttpService } from './shared/services/http.service';
import { NotificationService } from './admin/services/notification.service';
import { InvitationService } from './shared/services/invitation.service';
import { LoadingSpinnerService } from './shared/loading-spinner/loading-spinner.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    routing
  ],
  providers: [
    HttpService,
    AuthenticationService,
    FacebookService,
    NotificationService,
    NotificationsService,
    LoadingSpinnerService,
    InvitationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
