import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerTypeConfig } from './customer-type-config.model';
import { CustomerTypeConfigPopupService } from './customer-type-config-popup.service';
import { CustomerTypeConfigService } from './customer-type-config.service';
import { CustomerConfig, CustomerConfigService } from '../customer-config';

@Component({
    selector: 'jhi-customer-type-config-dialog',
    templateUrl: './customer-type-config-dialog.component.html'
})
export class CustomerTypeConfigDialogComponent implements OnInit {

    customerType: CustomerTypeConfig;
    isSaving: boolean;

    customers: CustomerConfig[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerTypeService: CustomerTypeConfigService,
        private customerService: CustomerConfigService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<CustomerConfig[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customerType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerTypeService.update(this.customerType));
        } else {
            this.subscribeToSaveResponse(
                this.customerTypeService.create(this.customerType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerTypeConfig>>) {
        result.subscribe((res: HttpResponse<CustomerTypeConfig>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerTypeConfig) {
        this.eventManager.broadcast({ name: 'customerTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: CustomerConfig) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-customer-type-config-popup',
    template: ''
})
export class CustomerTypeConfigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerTypePopupService: CustomerTypeConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.customerTypePopupService
                    .open(CustomerTypeConfigDialogComponent as Component, params['id']);
            } else {
                this.customerTypePopupService
                    .open(CustomerTypeConfigDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
