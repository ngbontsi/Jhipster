import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../../shared';
import {
    CustomerTypeModelService,
    CustomerTypeModelPopupService,
    CustomerTypeModelComponent,
    CustomerTypeModelDetailComponent,
    CustomerTypeModelDialogComponent,
    CustomerTypeModelPopupComponent,
    CustomerTypeModelDeletePopupComponent,
    CustomerTypeModelDeleteDialogComponent,
    customerTypeRoute,
    customerTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...customerTypeRoute,
    ...customerTypePopupRoute,
];

@NgModule({
    imports: [
        GettingstatedSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerTypeModelComponent,
        CustomerTypeModelDetailComponent,
        CustomerTypeModelDialogComponent,
        CustomerTypeModelDeleteDialogComponent,
        CustomerTypeModelPopupComponent,
        CustomerTypeModelDeletePopupComponent,
    ],
    entryComponents: [
        CustomerTypeModelComponent,
        CustomerTypeModelDialogComponent,
        CustomerTypeModelPopupComponent,
        CustomerTypeModelDeleteDialogComponent,
        CustomerTypeModelDeletePopupComponent,
    ],
    providers: [
        CustomerTypeModelService,
        CustomerTypeModelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedCustomerTypeModelModule {}
