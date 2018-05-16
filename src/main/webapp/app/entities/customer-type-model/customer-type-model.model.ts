import { BaseEntity } from './../../shared';

export class CustomerTypeModel implements BaseEntity {
    constructor(
        public id?: number,
        public custtype?: number,
        public description?: string,
    ) {
    }
}
