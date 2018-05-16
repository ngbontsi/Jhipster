import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoomServiceModel } from './room-service-model.model';
import { RoomServiceModelPopupService } from './room-service-model-popup.service';
import { RoomServiceModelService } from './room-service-model.service';

@Component({
    selector: 'jhi-room-service-model-dialog',
    templateUrl: './room-service-model-dialog.component.html'
})
export class RoomServiceModelDialogComponent implements OnInit {

    roomService: RoomServiceModel;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private roomServiceService: RoomServiceModelService,
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
        if (this.roomService.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roomServiceService.update(this.roomService));
        } else {
            this.subscribeToSaveResponse(
                this.roomServiceService.create(this.roomService));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RoomServiceModel>>) {
        result.subscribe((res: HttpResponse<RoomServiceModel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RoomServiceModel) {
        this.eventManager.broadcast({ name: 'roomServiceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-room-service-model-popup',
    template: ''
})
export class RoomServiceModelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomServicePopupService: RoomServiceModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.roomServicePopupService
                    .open(RoomServiceModelDialogComponent as Component, params['id']);
            } else {
                this.roomServicePopupService
                    .open(RoomServiceModelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
