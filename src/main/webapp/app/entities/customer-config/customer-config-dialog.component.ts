import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerConfig } from './customer-config.model';
import { CustomerConfigPopupService } from './customer-config-popup.service';
import { CustomerConfigService } from './customer-config.service';
import { CustomerTypeConfig, CustomerTypeConfigService } from '../customer-type-config';
import { BillConfig, BillConfigService } from '../bill-config';

@Component({
    selector: 'jhi-customer-config-dialog',
    templateUrl: './customer-config-dialog.component.html'
})
export class CustomerConfigDialogComponent implements OnInit {

    customer: CustomerConfig;
    isSaving: boolean;

    customertypes: CustomerTypeConfig[];

    bills: BillConfig[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerService: CustomerConfigService,
        private customerTypeService: CustomerTypeConfigService,
        private billService: BillConfigService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerTypeService
            .query({filter: 'customer-is-null'})
            .subscribe((res: HttpResponse<CustomerTypeConfig[]>) => {
                if (!this.customer.customerType || !this.customer.customerType.id) {
                    this.customertypes = res.body;
                } else {
                    this.customerTypeService
                        .find(this.customer.customerType.id)
                        .subscribe((subRes: HttpResponse<CustomerTypeConfig>) => {
                            this.customertypes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.billService.query()
            .subscribe((res: HttpResponse<BillConfig[]>) => { this.bills = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerConfig>>) {
        result.subscribe((res: HttpResponse<CustomerConfig>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerConfig) {
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

    trackCustomerTypeById(index: number, item: CustomerTypeConfig) {
        return item.id;
    }

    trackBillById(index: number, item: BillConfig) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-customer-config-popup',
    template: ''
})
export class CustomerConfigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerPopupService: CustomerConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.customerPopupService
                    .open(CustomerConfigDialogComponent as Component, params['id']);
            } else {
                this.customerPopupService
                    .open(CustomerConfigDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
