import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BookingModel } from './booking-model.model';
import { BookingModelPopupService } from './booking-model-popup.service';
import { BookingModelService } from './booking-model.service';
import { RoomModel, RoomModelService } from '../room-model';

@Component({
    selector: 'jhi-booking-model-dialog',
    templateUrl: './booking-model-dialog.component.html'
})
export class BookingModelDialogComponent implements OnInit {

    booking: BookingModel;
    isSaving: boolean;

    rooms: RoomModel[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bookingService: BookingModelService,
        private roomService: RoomModelService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.roomService.query()
            .subscribe((res: HttpResponse<RoomModel[]>) => { this.rooms = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.booking.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bookingService.update(this.booking));
        } else {
            this.subscribeToSaveResponse(
                this.bookingService.create(this.booking));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BookingModel>>) {
        result.subscribe((res: HttpResponse<BookingModel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BookingModel) {
        this.eventManager.broadcast({ name: 'bookingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRoomById(index: number, item: RoomModel) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-booking-model-popup',
    template: ''
})
export class BookingModelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bookingPopupService: BookingModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bookingPopupService
                    .open(BookingModelDialogComponent as Component, params['id']);
            } else {
                this.bookingPopupService
                    .open(BookingModelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
