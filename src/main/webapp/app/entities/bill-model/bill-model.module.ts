import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../../shared';
import {
    BillModelService,
    BillModelPopupService,
    BillModelComponent,
    BillModelDetailComponent,
    BillModelDialogComponent,
    BillModelPopupComponent,
    BillModelDeletePopupComponent,
    BillModelDeleteDialogComponent,
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
        BillModelComponent,
        BillModelDetailComponent,
        BillModelDialogComponent,
        BillModelDeleteDialogComponent,
        BillModelPopupComponent,
        BillModelDeletePopupComponent,
    ],
    entryComponents: [
        BillModelComponent,
        BillModelDialogComponent,
        BillModelPopupComponent,
        BillModelDeleteDialogComponent,
        BillModelDeletePopupComponent,
    ],
    providers: [
        BillModelService,
        BillModelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedBillModelModule {}
