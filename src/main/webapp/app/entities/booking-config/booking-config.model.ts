import { BaseEntity } from './../../shared';

export class BookingConfig implements BaseEntity {
    constructor(
        public id?: number,
        public datein?: any,
        public dateout?: any,
        public bill?: BaseEntity,
        public rooms?: BaseEntity[],
    ) {
    }
}
