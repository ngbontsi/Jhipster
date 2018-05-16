import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoomTypeModel } from './room-type-model.model';
import { RoomTypeModelPopupService } from './room-type-model-popup.service';
import { RoomTypeModelService } from './room-type-model.service';

@Component({
    selector: 'jhi-room-type-model-dialog',
    templateUrl: './room-type-model-dialog.component.html'
})
export class RoomTypeModelDialogComponent implements OnInit {

    roomType: RoomTypeModel;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private roomTypeService: RoomTypeModelService,
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
        if (this.roomType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roomTypeService.update(this.roomType));
        } else {
            this.subscribeToSaveResponse(
                this.roomTypeService.create(this.roomType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RoomTypeModel>>) {
        result.subscribe((res: HttpResponse<RoomTypeModel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RoomTypeModel) {
        this.eventManager.broadcast({ name: 'roomTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-room-type-model-popup',
    template: ''
})
export class RoomTypeModelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomTypePopupService: RoomTypeModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.roomTypePopupService
                    .open(RoomTypeModelDialogComponent as Component, params['id']);
            } else {
                this.roomTypePopupService
                    .open(RoomTypeModelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
