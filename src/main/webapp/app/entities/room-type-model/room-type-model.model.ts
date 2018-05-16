import { BaseEntity } from './../../shared';

export class RoomTypeModel implements BaseEntity {
    constructor(
        public id?: number,
        public roomtype?: number,
        public description?: string,
        public rates?: number,
    ) {
    }
}
