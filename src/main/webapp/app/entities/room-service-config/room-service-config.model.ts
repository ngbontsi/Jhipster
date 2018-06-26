import { BaseEntity } from './../../shared';

export class RoomServiceConfig implements BaseEntity {
    constructor(
        public id?: number,
        public description?: number,
        public bill?: BaseEntity,
    ) {
    }
}
