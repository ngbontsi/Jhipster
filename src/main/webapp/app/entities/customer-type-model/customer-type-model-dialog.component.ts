import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerTypeModel } from './customer-type-model.model';
import { CustomerTypeModelPopupService } from './customer-type-model-popup.service';
import { CustomerTypeModelService } from './customer-type-model.service';

@Component({
    selector: 'jhi-customer-type-model-dialog',
    templateUrl: './customer-type-model-dialog.component.html'
})
export class CustomerTypeModelDialogComponent implements OnInit {

    customerType: CustomerTypeModel;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private customerTypeService: CustomerTypeModelService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerTypeModel>>) {
        result.subscribe((res: HttpResponse<CustomerTypeModel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerTypeModel) {
        this.eventManager.broadcast({ name: 'customerTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-customer-type-model-popup',
    template: ''
})
export class CustomerTypeModelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerTypePopupService: CustomerTypeModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.customerTypePopupService
                    .open(CustomerTypeModelDialogComponent as Component, params['id']);
            } else {
                this.customerTypePopupService
                    .open(CustomerTypeModelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
