import { BaseEntity } from './../../shared';

export class RoomTypeConfig implements BaseEntity {
    constructor(
        public id?: number,
        public description?: number,
        public room?: BaseEntity,
    ) {
    }
}
