import { BaseEntity } from './../../shared';

export class CustomerModel implements BaseEntity {
    constructor(
        public id?: number,
        public cusid?: number,
        public name?: string,
        public surname?: string,
        public email?: string,
        public custtype?: number,
        public booking?: BaseEntity,
        public bill?: BaseEntity,
        public customerType?: BaseEntity,
    ) {
    }
}
