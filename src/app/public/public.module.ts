import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { Ng2SmartFormsModule } from 'ng2-smart-forms';

import { PublicRouting } from './public.routing';

import { TemplateService } from './shared/services/template.service';
import { MapService } from './shared/services/map.service';

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
import { RsvpModalComponent } from './sections/rsvp-modal/rsvp-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PublicRouting,
    SharedModule,
    Ng2SmartFormsModule
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
    RsvpModalComponent
  ],
  providers: [
    TemplateService,
    MapService
  ],
})
export class PublicModule { }
