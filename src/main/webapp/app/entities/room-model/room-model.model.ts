import { BaseEntity } from './../../shared';

export class RoomModel implements BaseEntity {
    constructor(
        public id?: number,
        public isreserved?: boolean,
        public roomType?: BaseEntity,
        public bookings?: BaseEntity[],
    ) {
        this.isreserved = false;
    }
}
