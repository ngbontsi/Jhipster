import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../../shared';
import {
    RoomServiceModelService,
    RoomServiceModelPopupService,
    RoomServiceModelComponent,
    RoomServiceModelDetailComponent,
    RoomServiceModelDialogComponent,
    RoomServiceModelPopupComponent,
    RoomServiceModelDeletePopupComponent,
    RoomServiceModelDeleteDialogComponent,
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
        RoomServiceModelComponent,
        RoomServiceModelDetailComponent,
        RoomServiceModelDialogComponent,
        RoomServiceModelDeleteDialogComponent,
        RoomServiceModelPopupComponent,
        RoomServiceModelDeletePopupComponent,
    ],
    entryComponents: [
        RoomServiceModelComponent,
        RoomServiceModelDialogComponent,
        RoomServiceModelPopupComponent,
        RoomServiceModelDeleteDialogComponent,
        RoomServiceModelDeletePopupComponent,
    ],
    providers: [
        RoomServiceModelService,
        RoomServiceModelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedRoomServiceModelModule {}
