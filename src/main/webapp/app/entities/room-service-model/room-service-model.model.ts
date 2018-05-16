import { BaseEntity } from './../../shared';

export class RoomServiceModel implements BaseEntity {
    constructor(
        public id?: number,
        public serviceid?: number,
        public description?: string,
    ) {
    }
}
