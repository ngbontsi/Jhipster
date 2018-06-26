import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../../shared';
import {
    BookingConfigService,
    BookingConfigPopupService,
    BookingConfigComponent,
    BookingConfigDetailComponent,
    BookingConfigDialogComponent,
    BookingConfigPopupComponent,
    BookingConfigDeletePopupComponent,
    BookingConfigDeleteDialogComponent,
    bookingRoute,
    bookingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bookingRoute,
    ...bookingPopupRoute,
];

@NgModule({
    imports: [
        GettingstatedSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BookingConfigComponent,
        BookingConfigDetailComponent,
        BookingConfigDialogComponent,
        BookingConfigDeleteDialogComponent,
        BookingConfigPopupComponent,
        BookingConfigDeletePopupComponent,
    ],
    entryComponents: [
        BookingConfigComponent,
        BookingConfigDialogComponent,
        BookingConfigPopupComponent,
        BookingConfigDeleteDialogComponent,
        BookingConfigDeletePopupComponent,
    ],
    providers: [
        BookingConfigService,
        BookingConfigPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedBookingConfigModule {}
