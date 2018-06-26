import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoomModel } from './room-model.model';
import { RoomModelPopupService } from './room-model-popup.service';
import { RoomModelService } from './room-model.service';
import { RoomTypeConfig, RoomTypeConfigService } from '../room-type-config';

@Component({
    selector: 'jhi-room-model-dialog',
    templateUrl: './room-model-dialog.component.html'
})
export class RoomModelDialogComponent implements OnInit {

    room: RoomModel;
    isSaving: boolean;

    roomtypes: RoomTypeConfig[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private roomService: RoomModelService,
        private roomTypeService: RoomTypeConfigService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.roomTypeService
            .query({filter: 'room-is-null'})
            .subscribe((res: HttpResponse<RoomTypeConfig[]>) => {
                if (!this.room.roomType || !this.room.roomType.id) {
                    this.roomtypes = res.body;
                } else {
                    this.roomTypeService
                        .find(this.room.roomType.id)
                        .subscribe((subRes: HttpResponse<RoomTypeConfig>) => {
                            this.roomtypes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.room.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roomService.update(this.room));
        } else {
            this.subscribeToSaveResponse(
                this.roomService.create(this.room));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RoomModel>>) {
        result.subscribe((res: HttpResponse<RoomModel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RoomModel) {
        this.eventManager.broadcast({ name: 'roomListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRoomTypeById(index: number, item: RoomTypeConfig) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-room-model-popup',
    template: ''
})
export class RoomModelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomPopupService: RoomModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.roomPopupService
                    .open(RoomModelDialogComponent as Component, params['id']);
            } else {
                this.roomPopupService
                    .open(RoomModelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
