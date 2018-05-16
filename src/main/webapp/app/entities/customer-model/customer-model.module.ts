import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../../shared';
import {
    CustomerModelService,
    CustomerModelPopupService,
    CustomerModelComponent,
    CustomerModelDetailComponent,
    CustomerModelDialogComponent,
    CustomerModelPopupComponent,
    CustomerModelDeletePopupComponent,
    CustomerModelDeleteDialogComponent,
    customerRoute,
    customerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...customerRoute,
    ...customerPopupRoute,
];

@NgModule({
    imports: [
        GettingstatedSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerModelComponent,
        CustomerModelDetailComponent,
        CustomerModelDialogComponent,
        CustomerModelDeleteDialogComponent,
        CustomerModelPopupComponent,
        CustomerModelDeletePopupComponent,
    ],
    entryComponents: [
        CustomerModelComponent,
        CustomerModelDialogComponent,
        CustomerModelPopupComponent,
        CustomerModelDeleteDialogComponent,
        CustomerModelDeletePopupComponent,
    ],
    providers: [
        CustomerModelService,
        CustomerModelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedCustomerModelModule {}
