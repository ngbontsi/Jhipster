import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../../shared';
import {
    CustomerTypeConfigService,
    CustomerTypeConfigPopupService,
    CustomerTypeConfigComponent,
    CustomerTypeConfigDetailComponent,
    CustomerTypeConfigDialogComponent,
    CustomerTypeConfigPopupComponent,
    CustomerTypeConfigDeletePopupComponent,
    CustomerTypeConfigDeleteDialogComponent,
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
        CustomerTypeConfigComponent,
        CustomerTypeConfigDetailComponent,
        CustomerTypeConfigDialogComponent,
        CustomerTypeConfigDeleteDialogComponent,
        CustomerTypeConfigPopupComponent,
        CustomerTypeConfigDeletePopupComponent,
    ],
    entryComponents: [
        CustomerTypeConfigComponent,
        CustomerTypeConfigDialogComponent,
        CustomerTypeConfigPopupComponent,
        CustomerTypeConfigDeleteDialogComponent,
        CustomerTypeConfigDeletePopupComponent,
    ],
    providers: [
        CustomerTypeConfigService,
        CustomerTypeConfigPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedCustomerTypeConfigModule {}
