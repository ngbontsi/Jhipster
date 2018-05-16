import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../../shared';
import {
    RoomModelService,
    RoomModelPopupService,
    RoomModelComponent,
    RoomModelDetailComponent,
    RoomModelDialogComponent,
    RoomModelPopupComponent,
    RoomModelDeletePopupComponent,
    RoomModelDeleteDialogComponent,
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
        RoomModelComponent,
        RoomModelDetailComponent,
        RoomModelDialogComponent,
        RoomModelDeleteDialogComponent,
        RoomModelPopupComponent,
        RoomModelDeletePopupComponent,
    ],
    entryComponents: [
        RoomModelComponent,
        RoomModelDialogComponent,
        RoomModelPopupComponent,
        RoomModelDeleteDialogComponent,
        RoomModelDeletePopupComponent,
    ],
    providers: [
        RoomModelService,
        RoomModelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedRoomModelModule {}
