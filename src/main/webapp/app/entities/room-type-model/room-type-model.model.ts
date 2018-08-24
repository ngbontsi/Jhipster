import { BaseEntity } from './../../shared';

export class RoomTypeModel implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
    ) {
    }
}
