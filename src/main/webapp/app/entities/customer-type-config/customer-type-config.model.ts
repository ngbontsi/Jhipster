import { BaseEntity } from './../../shared';

export class CustomerTypeConfig implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public customer?: BaseEntity,
    ) {
    }
}
