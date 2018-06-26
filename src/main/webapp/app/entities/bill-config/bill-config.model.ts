import { BaseEntity } from './../../shared';

export class BillConfig implements BaseEntity {
    constructor(
        public id?: number,
        public paytype?: number,
        public paydate?: any,
        public billcost?: number,
        public customers?: BaseEntity[],
        public roomServices?: BaseEntity[],
        public bookings?: BaseEntity[],
    ) {
    }
}
