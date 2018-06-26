import { BaseEntity } from './../../shared';

export class RoomServiceModel implements BaseEntity {
    constructor(
        public id?: number,
        public description?: number,
        public bills?: BaseEntity[],
    ) {
    }
}
