import { BaseEntity } from './../../shared';

export class BookingModel implements BaseEntity {
    constructor(
        public id?: number,
        public datein?: any,
        public dateout?: any,
        public room?: BaseEntity,
        public bills?: BaseEntity[],
    ) {
    }
}
