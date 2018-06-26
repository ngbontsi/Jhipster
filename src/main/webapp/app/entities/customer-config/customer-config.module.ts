import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../../shared';
import {
    CustomerConfigService,
    CustomerConfigPopupService,
    CustomerConfigComponent,
    CustomerConfigDetailComponent,
    CustomerConfigDialogComponent,
    CustomerConfigPopupComponent,
    CustomerConfigDeletePopupComponent,
    CustomerConfigDeleteDialogComponent,
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
        CustomerConfigComponent,
        CustomerConfigDetailComponent,
        CustomerConfigDialogComponent,
        CustomerConfigDeleteDialogComponent,
        CustomerConfigPopupComponent,
        CustomerConfigDeletePopupComponent,
    ],
    entryComponents: [
        CustomerConfigComponent,
        CustomerConfigDialogComponent,
        CustomerConfigPopupComponent,
        CustomerConfigDeleteDialogComponent,
        CustomerConfigDeletePopupComponent,
    ],
    providers: [
        CustomerConfigService,
        CustomerConfigPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedCustomerConfigModule {}
