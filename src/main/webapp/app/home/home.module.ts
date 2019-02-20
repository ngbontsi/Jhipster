import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GettingstatedSharedModule } from '../shared';
import { SchedulerModule } from '../shared/scheduler/scheduler.module';

import { HOME_ROUTE, HomeComponent } from './';

@NgModule({
    imports: [
        GettingstatedSharedModule,
        SchedulerModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedHomeModule {}
