import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../../shared';
import {
    BillConfigService,
    BillConfigPopupService,
    BillConfigComponent,
    BillConfigDetailComponent,
    BillConfigDialogComponent,
    BillConfigPopupComponent,
    BillConfigDeletePopupComponent,
    BillConfigDeleteDialogComponent,
    billRoute,
    billPopupRoute,
} from './';

const ENTITY_STATES = [
    ...billRoute,
    ...billPopupRoute,
];

@NgModule({
    imports: [
        GettingstatedSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BillConfigComponent,
        BillConfigDetailComponent,
        BillConfigDialogComponent,
        BillConfigDeleteDialogComponent,
        BillConfigPopupComponent,
        BillConfigDeletePopupComponent,
    ],
    entryComponents: [
        BillConfigComponent,
        BillConfigDialogComponent,
        BillConfigPopupComponent,
        BillConfigDeleteDialogComponent,
        BillConfigDeletePopupComponent,
    ],
    providers: [
        BillConfigService,
        BillConfigPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedBillConfigModule {}
