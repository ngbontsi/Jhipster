import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../../shared';
import {
    RoomConfigService,
    RoomConfigPopupService,
    RoomConfigComponent,
    RoomConfigDetailComponent,
    RoomConfigDialogComponent,
    RoomConfigPopupComponent,
    RoomConfigDeletePopupComponent,
    RoomConfigDeleteDialogComponent,
    roomRoute,
    roomPopupRoute,
} from './';

const ENTITY_STATES = [
    ...roomRoute,
    ...roomPopupRoute,
];

@NgModule({
    imports: [
        GettingstatedSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RoomConfigComponent,
        RoomConfigDetailComponent,
        RoomConfigDialogComponent,
        RoomConfigDeleteDialogComponent,
        RoomConfigPopupComponent,
        RoomConfigDeletePopupComponent,
    ],
    entryComponents: [
        RoomConfigComponent,
        RoomConfigDialogComponent,
        RoomConfigPopupComponent,
        RoomConfigDeleteDialogComponent,
        RoomConfigDeletePopupComponent,
    ],
    providers: [
        RoomConfigService,
        RoomConfigPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedRoomConfigModule {}
