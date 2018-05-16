import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerModel } from './customer-model.model';
import { CustomerModelPopupService } from './customer-model-popup.service';
import { CustomerModelService } from './customer-model.service';
import { BookingModel, BookingModelService } from '../booking-model';
import { BillModel, BillModelService } from '../bill-model';
import { CustomerTypeModel, CustomerTypeModelService } from '../customer-type-model';

@Component({
    selector: 'jhi-customer-model-dialog',
    templateUrl: './customer-model-dialog.component.html'
})
export class CustomerModelDialogComponent implements OnInit {

    customer: CustomerModel;
    isSaving: boolean;

    bookings: BookingModel[];

    bills: BillModel[];

    customertypes: CustomerTypeModel[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerService: CustomerModelService,
        private bookingService: BookingModelService,
        private billService: BillModelService,
        private customerTypeService: CustomerTypeModelService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bookingService.query()
            .subscribe((res: HttpResponse<BookingModel[]>) => { this.bookings = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.billService.query()
            .subscribe((res: HttpResponse<BillModel[]>) => { this.bills = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.customerTypeService.query()
            .subscribe((res: HttpResponse<CustomerTypeModel[]>) => { this.customertypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerService.update(this.customer));
        } else {
            this.subscribeToSaveResponse(
                this.customerService.create(this.customer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerModel>>) {
        result.subscribe((res: HttpResponse<CustomerModel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerModel) {
        this.eventManager.broadcast({ name: 'customerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBookingById(index: number, item: BookingModel) {
        return item.id;
    }

    trackBillById(index: number, item: BillModel) {
        return item.id;
    }

    trackCustomerTypeById(index: number, item: CustomerTypeModel) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-customer-model-popup',
    template: ''
})
export class CustomerModelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerPopupService: CustomerModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.customerPopupService
                    .open(CustomerModelDialogComponent as Component, params['id']);
            } else {
                this.customerPopupService
                    .open(CustomerModelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
