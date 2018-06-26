import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoomServiceConfig } from './room-service-config.model';
import { RoomServiceConfigPopupService } from './room-service-config-popup.service';
import { RoomServiceConfigService } from './room-service-config.service';
import { BillConfig, BillConfigService } from '../bill-config';

@Component({
    selector: 'jhi-room-service-config-dialog',
    templateUrl: './room-service-config-dialog.component.html'
})
export class RoomServiceConfigDialogComponent implements OnInit {

    roomService: RoomServiceConfig;
    isSaving: boolean;

    bills: BillConfig[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private roomServiceService: RoomServiceConfigService,
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
        if (this.roomService.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roomServiceService.update(this.roomService));
        } else {
            this.subscribeToSaveResponse(
                this.roomServiceService.create(this.roomService));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RoomServiceConfig>>) {
        result.subscribe((res: HttpResponse<RoomServiceConfig>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RoomServiceConfig) {
        this.eventManager.broadcast({ name: 'roomServiceListModification', content: 'OK'});
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
    selector: 'jhi-room-service-config-popup',
    template: ''
})
export class RoomServiceConfigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomServicePopupService: RoomServiceConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.roomServicePopupService
                    .open(RoomServiceConfigDialogComponent as Component, params['id']);
            } else {
                this.roomServicePopupService
                    .open(RoomServiceConfigDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
