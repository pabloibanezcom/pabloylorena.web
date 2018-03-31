import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Ng2SmartFormsModule } from 'ng2-smart-forms';

import { PublicRouting } from './public.routing';

import { TemplateService } from './services/template.service';
import { MapService } from './services/map.service';
import { InvitationService } from './services/invitation.service';
import { AnalyticsService } from './services/analytics.service';

import { PublicBaseComponent } from './public-base/public-base.component';
import { WeddingComponent } from './sections/wedding/wedding.component';
import { CountdownBoxComponent } from './sections/wedding/countdown-box/countdown-box.component';
import { CeremonyComponent } from './sections/wedding/ceremony/ceremony.component';
import { ReceptionComponent } from './sections/wedding/reception/reception.component';
import { RsvpButtonComponent } from './shared/rsvp-button/rsvp-button.component';
import { WeddingMapComponent } from './sections/wedding/wedding-map/wedding-map.component';
import { DirectionModalComponent } from './sections/wedding/direction-modal/direction-modal.component';
import { AccommodationComponent } from './sections/accommodation/accommodation.component';
import { HotelBoxComponent } from './sections/accommodation/hotel-box/hotel-box.component';
import { RsvpModalComponent } from './modals/rsvp-modal/rsvp-modal.component';
import { GalleryComponent } from './sections/gallery/gallery.component';
import { GiftComponent } from './sections/gift/gift.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PublicRouting,
    SharedModule,
    Ng2SmartFormsModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
  ],
  declarations: [
    PublicBaseComponent,
    WeddingComponent,
    CountdownBoxComponent,
    CeremonyComponent,
    ReceptionComponent,
    RsvpButtonComponent,
    WeddingMapComponent,
    DirectionModalComponent,
    AccommodationComponent,
    HotelBoxComponent,
    RsvpModalComponent,
    GalleryComponent,
    GiftComponent
  ],
  providers: [
    TemplateService,
    MapService,
    InvitationService,
    AnalyticsService
  ],
})
export class PublicModule { }
