import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../../shared';
import {
    BookingModelService,
    BookingModelPopupService,
    BookingModelComponent,
    BookingModelDetailComponent,
    BookingModelDialogComponent,
    BookingModelPopupComponent,
    BookingModelDeletePopupComponent,
    BookingModelDeleteDialogComponent,
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
        BookingModelComponent,
        BookingModelDetailComponent,
        BookingModelDialogComponent,
        BookingModelDeleteDialogComponent,
        BookingModelPopupComponent,
        BookingModelDeletePopupComponent,
    ],
    entryComponents: [
        BookingModelComponent,
        BookingModelDialogComponent,
        BookingModelPopupComponent,
        BookingModelDeleteDialogComponent,
        BookingModelDeletePopupComponent,
    ],
    providers: [
        BookingModelService,
        BookingModelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedBookingModelModule {}
