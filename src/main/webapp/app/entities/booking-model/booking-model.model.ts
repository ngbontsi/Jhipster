import { BaseEntity } from './../../shared';

export class BookingModel implements BaseEntity {
    constructor(
        public id?: number,
        public bookid?: number,
        public datein?: any,
        public dateout?: any,
        public roomid?: number,
        public custid?: number,
    ) {
    }
}
