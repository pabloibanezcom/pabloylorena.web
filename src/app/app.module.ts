import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FacebookService } from 'ngx-facebook';
import { NotificationsService } from 'angular2-notifications';
import { TokenInterceptor } from 'ng2-smart-auth';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';


import { LoaderInterceptor } from './shared/loading-spinner/loader.interceptor';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HttpService } from './shared/services/http.service';
import { NotificationService } from './admin/services/notification.service';
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
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    routing
  ],
  providers: [
    HttpService,
    FacebookService,
    NotificationService,
    NotificationsService,
    LoadingSpinnerService,
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
