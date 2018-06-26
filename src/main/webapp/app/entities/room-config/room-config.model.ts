import { BaseEntity } from './../../shared';

export class RoomConfig implements BaseEntity {
    constructor(
        public id?: number,
        public isreserved?: boolean,
        public roomType?: BaseEntity,
        public booking?: BaseEntity,
    ) {
        this.isreserved = false;
    }
}
