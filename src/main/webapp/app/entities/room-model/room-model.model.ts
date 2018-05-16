import { BaseEntity } from './../../shared';

export class RoomModel implements BaseEntity {
    constructor(
        public id?: number,
        public roomid?: number,
        public roomtype?: number,
        public isReserved?: boolean,
        public booking?: BaseEntity,
        public roomType?: BaseEntity,
    ) {
        this.isReserved = false;
    }
}
