import { BaseEntity } from './../../shared';

export class CustomerModel implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public surname?: string,
        public email?: string,
        public customerType?: BaseEntity,
        public bills?: BaseEntity[],
    ) {
    }
}
