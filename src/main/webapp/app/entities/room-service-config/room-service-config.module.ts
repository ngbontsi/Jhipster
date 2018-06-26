import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../../shared';
import {
    RoomServiceConfigService,
    RoomServiceConfigPopupService,
    RoomServiceConfigComponent,
    RoomServiceConfigDetailComponent,
    RoomServiceConfigDialogComponent,
    RoomServiceConfigPopupComponent,
    RoomServiceConfigDeletePopupComponent,
    RoomServiceConfigDeleteDialogComponent,
    roomServiceRoute,
    roomServicePopupRoute,
} from './';

const ENTITY_STATES = [
    ...roomServiceRoute,
    ...roomServicePopupRoute,
];

@NgModule({
    imports: [
        GettingstatedSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RoomServiceConfigComponent,
        RoomServiceConfigDetailComponent,
        RoomServiceConfigDialogComponent,
        RoomServiceConfigDeleteDialogComponent,
        RoomServiceConfigPopupComponent,
        RoomServiceConfigDeletePopupComponent,
    ],
    entryComponents: [
        RoomServiceConfigComponent,
        RoomServiceConfigDialogComponent,
        RoomServiceConfigPopupComponent,
        RoomServiceConfigDeleteDialogComponent,
        RoomServiceConfigDeletePopupComponent,
    ],
    providers: [
        RoomServiceConfigService,
        RoomServiceConfigPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedRoomServiceConfigModule {}
