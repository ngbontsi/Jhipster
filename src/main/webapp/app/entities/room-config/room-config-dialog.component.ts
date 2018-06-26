import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoomConfig } from './room-config.model';
import { RoomConfigPopupService } from './room-config-popup.service';
import { RoomConfigService } from './room-config.service';
import { RoomTypeConfig, RoomTypeConfigService } from '../room-type-config';
import { BookingConfig, BookingConfigService } from '../booking-config';

@Component({
    selector: 'jhi-room-config-dialog',
    templateUrl: './room-config-dialog.component.html'
})
export class RoomConfigDialogComponent implements OnInit {

    room: RoomConfig;
    isSaving: boolean;

    roomtypes: RoomTypeConfig[];

    bookings: BookingConfig[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private roomService: RoomConfigService,
        private roomTypeService: RoomTypeConfigService,
        private bookingService: BookingConfigService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.roomTypeService
            .query({filter: 'room-is-null'})
            .subscribe((res: HttpResponse<RoomTypeConfig[]>) => {
                if (!this.room.roomType || !this.room.roomType.id) {
                    this.roomtypes = res.body;
                } else {
                    this.roomTypeService
                        .find(this.room.roomType.id)
                        .subscribe((subRes: HttpResponse<RoomTypeConfig>) => {
                            this.roomtypes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.bookingService.query()
            .subscribe((res: HttpResponse<BookingConfig[]>) => { this.bookings = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.room.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roomService.update(this.room));
        } else {
            this.subscribeToSaveResponse(
                this.roomService.create(this.room));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RoomConfig>>) {
        result.subscribe((res: HttpResponse<RoomConfig>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RoomConfig) {
        this.eventManager.broadcast({ name: 'roomListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRoomTypeById(index: number, item: RoomTypeConfig) {
        return item.id;
    }

    trackBookingById(index: number, item: BookingConfig) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-room-config-popup',
    template: ''
})
export class RoomConfigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomPopupService: RoomConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.roomPopupService
                    .open(RoomConfigDialogComponent as Component, params['id']);
            } else {
                this.roomPopupService
                    .open(RoomConfigDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
