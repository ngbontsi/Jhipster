import { BaseEntity } from './../../shared';

export class BillModel implements BaseEntity {
    constructor(
        public id?: number,
        public paytype?: number,
        public paydate?: any,
        public billcost?: number,
        public customer?: BaseEntity,
        public roomService?: BaseEntity,
        public booking?: BaseEntity,
    ) {
    }
}
