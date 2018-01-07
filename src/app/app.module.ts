import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { FacebookService } from 'ngx-facebook';
import { NotificationsService } from 'angular2-notifications';

import { HttpService } from './shared/services/http.service';
import { AuthenticationService } from './admin/services/authentication.service';
import { NotificationService } from './admin/services/notification.service';
import { InvitationService } from './shared/services/invitation.service';

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
    routing
  ],
  providers: [
    HttpService,
    AuthenticationService,
    FacebookService,
    NotificationService,
    NotificationsService,
    InvitationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
