import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../../shared';
import {
    RoomTypeConfigService,
    RoomTypeConfigPopupService,
    RoomTypeConfigComponent,
    RoomTypeConfigDetailComponent,
    RoomTypeConfigDialogComponent,
    RoomTypeConfigPopupComponent,
    RoomTypeConfigDeletePopupComponent,
    RoomTypeConfigDeleteDialogComponent,
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
        RoomTypeConfigComponent,
        RoomTypeConfigDetailComponent,
        RoomTypeConfigDialogComponent,
        RoomTypeConfigDeleteDialogComponent,
        RoomTypeConfigPopupComponent,
        RoomTypeConfigDeletePopupComponent,
    ],
    entryComponents: [
        RoomTypeConfigComponent,
        RoomTypeConfigDialogComponent,
        RoomTypeConfigPopupComponent,
        RoomTypeConfigDeleteDialogComponent,
        RoomTypeConfigDeletePopupComponent,
    ],
    providers: [
        RoomTypeConfigService,
        RoomTypeConfigPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedRoomTypeConfigModule {}
