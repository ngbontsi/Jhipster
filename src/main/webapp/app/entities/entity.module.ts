import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GettingstatedBookingModelModule } from './booking-model/booking-model.module';
import { GettingstatedRoomModelModule } from './room-model/room-model.module';
import { GettingstatedBillModelModule } from './bill-model/bill-model.module';
import { GettingstatedRoomServiceModelModule } from './room-service-model/room-service-model.module';
import { GettingstatedRoomTypeModelModule } from './room-type-model/room-type-model.module';
import { GettingstatedCustomerModelModule } from './customer-model/customer-model.module';
import { GettingstatedCustomerTypeModelModule } from './customer-type-model/customer-type-model.module';
import { GettingstatedBookingConfigModule } from './booking-config/booking-config.module';
import { GettingstatedRoomConfigModule } from './room-config/room-config.module';
import { GettingstatedBillConfigModule } from './bill-config/bill-config.module';
import { GettingstatedRoomServiceConfigModule } from './room-service-config/room-service-config.module';
import { GettingstatedRoomTypeConfigModule } from './room-type-config/room-type-config.module';
import { GettingstatedCustomerConfigModule } from './customer-config/customer-config.module';
import { GettingstatedCustomerTypeConfigModule } from './customer-type-config/customer-type-config.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GettingstatedBookingModelModule,
        GettingstatedRoomModelModule,
        GettingstatedBillModelModule,
        GettingstatedRoomServiceModelModule,
        GettingstatedRoomTypeModelModule,
        GettingstatedCustomerModelModule,
        GettingstatedCustomerTypeModelModule,
        GettingstatedBookingConfigModule,
        GettingstatedRoomConfigModule,
        GettingstatedBillConfigModule,
        GettingstatedRoomServiceConfigModule,
        GettingstatedRoomTypeConfigModule,
        GettingstatedCustomerConfigModule,
        GettingstatedCustomerTypeConfigModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GettingstatedEntityModule {}
