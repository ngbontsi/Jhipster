import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeIt);

import { SchedulerCalendarComponent } from './scheduler-calendar.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { SchedulerModule } from 'angular-calendar-scheduler';

import { SchedularCalendarService } from './scheduler-calendar.service';

import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [
    SchedulerCalendarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    SchedulerModule.forRoot({ locale: 'en', headerDateFormat: 'daysRange' }),
    MatProgressSpinnerModule
  ],
  providers: [
    SchedularCalendarService,
    { provide: LOCALE_ID, useValue: 'en-US' }
  ],
  bootstrap: [SchedulerCalendarComponent]
})
class SchedulerCalendarModule { }