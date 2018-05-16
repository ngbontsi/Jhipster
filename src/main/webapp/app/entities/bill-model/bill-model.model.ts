import { BaseEntity } from './../../shared';

export class BillModel implements BaseEntity {
    constructor(
        public id?: number,
        public billid?: number,
        public paytype?: number,
        public paydate?: any,
        public cost?: number,
        public custid?: number,
        public serviceid?: number,
        public roomService?: BaseEntity,
    ) {
    }
}
