import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BillModel } from './bill-model.model';
import { BillModelPopupService } from './bill-model-popup.service';
import { BillModelService } from './bill-model.service';
import { CustomerModel, CustomerModelService } from '../customer-model';
import { RoomServiceModel, RoomServiceModelService } from '../room-service-model';
import { BookingModel, BookingModelService } from '../booking-model';

@Component({
    selector: 'jhi-bill-model-dialog',
    templateUrl: './bill-model-dialog.component.html'
})
export class BillModelDialogComponent implements OnInit {

    bill: BillModel;
    isSaving: boolean;

    customers: CustomerModel[];

    roomservices: RoomServiceModel[];

    bookings: BookingModel[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private billService: BillModelService,
        private customerService: CustomerModelService,
        private roomServiceService: RoomServiceModelService,
        private bookingService: BookingModelService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<CustomerModel[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.roomServiceService.query()
            .subscribe((res: HttpResponse<RoomServiceModel[]>) => { this.roomservices = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.bookingService.query()
            .subscribe((res: HttpResponse<BookingModel[]>) => { this.bookings = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bill.id !== undefined) {
            this.subscribeToSaveResponse(
                this.billService.update(this.bill));
        } else {
            this.subscribeToSaveResponse(
                this.billService.create(this.bill));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BillModel>>) {
        result.subscribe((res: HttpResponse<BillModel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BillModel) {
        this.eventManager.broadcast({ name: 'billListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: CustomerModel) {
        return item.id;
    }

    trackRoomServiceById(index: number, item: RoomServiceModel) {
        return item.id;
    }

    trackBookingById(index: number, item: BookingModel) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bill-model-popup',
    template: ''
})
export class BillModelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billPopupService: BillModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.billPopupService
                    .open(BillModelDialogComponent as Component, params['id']);
            } else {
                this.billPopupService
                    .open(BillModelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
