import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../../shared';
import {
    RoomTypeModelService,
    RoomTypeModelPopupService,
    RoomTypeModelComponent,
    RoomTypeModelDetailComponent,
    RoomTypeModelDialogComponent,
    RoomTypeModelPopupComponent,
    RoomTypeModelDeletePopupComponent,
    RoomTypeModelDeleteDialogComponent,
    roomTypeRoute,
    roomTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...roomTypeRoute,
    ...roomTypePopupRoute,
];

@NgModule({
    imports: [
        GettingstatedSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RoomTypeModelComponent,
        RoomTypeModelDetailComponent,
        RoomTypeModelDialogComponent,
        RoomTypeModelDeleteDialogComponent,
        RoomTypeModelPopupComponent,
        RoomTypeModelDeletePopupComponent,
    ],
    entryComponents: [
        RoomTypeModelComponent,
        RoomTypeModelDialogComponent,
        RoomTypeModelPopupComponent,
        RoomTypeModelDeleteDialogComponent,
        RoomTypeModelDeletePopupComponent,
    ],
    providers: [
        RoomTypeModelService,
        RoomTypeModelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedRoomTypeModelModule {}
