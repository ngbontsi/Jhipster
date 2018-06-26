import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BillConfig } from './bill-config.model';
import { BillConfigPopupService } from './bill-config-popup.service';
import { BillConfigService } from './bill-config.service';

@Component({
    selector: 'jhi-bill-config-dialog',
    templateUrl: './bill-config-dialog.component.html'
})
export class BillConfigDialogComponent implements OnInit {

    bill: BillConfig;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private billService: BillConfigService,
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
        if (this.bill.id !== undefined) {
            this.subscribeToSaveResponse(
                this.billService.update(this.bill));
        } else {
            this.subscribeToSaveResponse(
                this.billService.create(this.bill));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BillConfig>>) {
        result.subscribe((res: HttpResponse<BillConfig>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BillConfig) {
        this.eventManager.broadcast({ name: 'billListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-bill-config-popup',
    template: ''
})
export class BillConfigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billPopupService: BillConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.billPopupService
                    .open(BillConfigDialogComponent as Component, params['id']);
            } else {
                this.billPopupService
                    .open(BillConfigDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
