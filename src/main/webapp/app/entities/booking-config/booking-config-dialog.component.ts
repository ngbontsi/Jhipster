import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BookingConfig } from './booking-config.model';
import { BookingConfigPopupService } from './booking-config-popup.service';
import { BookingConfigService } from './booking-config.service';
import { BillConfig, BillConfigService } from '../bill-config';

@Component({
    selector: 'jhi-booking-config-dialog',
    templateUrl: './booking-config-dialog.component.html'
})
export class BookingConfigDialogComponent implements OnInit {

    booking: BookingConfig;
    isSaving: boolean;

    bills: BillConfig[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bookingService: BookingConfigService,
        private billService: BillConfigService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.billService.query()
            .subscribe((res: HttpResponse<BillConfig[]>) => { this.bills = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<BookingConfig>>) {
        result.subscribe((res: HttpResponse<BookingConfig>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BookingConfig) {
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

    trackBillById(index: number, item: BillConfig) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-booking-config-popup',
    template: ''
})
export class BookingConfigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bookingPopupService: BookingConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bookingPopupService
                    .open(BookingConfigDialogComponent as Component, params['id']);
            } else {
                this.bookingPopupService
                    .open(BookingConfigDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
