import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoomTypeConfig } from './room-type-config.model';
import { RoomTypeConfigPopupService } from './room-type-config-popup.service';
import { RoomTypeConfigService } from './room-type-config.service';
import { RoomConfig, RoomConfigService } from '../room-config';

@Component({
    selector: 'jhi-room-type-config-dialog',
    templateUrl: './room-type-config-dialog.component.html'
})
export class RoomTypeConfigDialogComponent implements OnInit {

    roomType: RoomTypeConfig;
    isSaving: boolean;

    rooms: RoomConfig[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private roomTypeService: RoomTypeConfigService,
        private roomService: RoomConfigService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.roomService.query()
            .subscribe((res: HttpResponse<RoomConfig[]>) => { this.rooms = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.roomType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roomTypeService.update(this.roomType));
        } else {
            this.subscribeToSaveResponse(
                this.roomTypeService.create(this.roomType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RoomTypeConfig>>) {
        result.subscribe((res: HttpResponse<RoomTypeConfig>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RoomTypeConfig) {
        this.eventManager.broadcast({ name: 'roomTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRoomById(index: number, item: RoomConfig) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-room-type-config-popup',
    template: ''
})
export class RoomTypeConfigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomTypePopupService: RoomTypeConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.roomTypePopupService
                    .open(RoomTypeConfigDialogComponent as Component, params['id']);
            } else {
                this.roomTypePopupService
                    .open(RoomTypeConfigDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
