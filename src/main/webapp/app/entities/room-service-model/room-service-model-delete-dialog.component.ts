import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoomServiceModel } from './room-service-model.model';
import { RoomServiceModelPopupService } from './room-service-model-popup.service';
import { RoomServiceModelService } from './room-service-model.service';

@Component({
    selector: 'jhi-room-service-model-delete-dialog',
    templateUrl: './room-service-model-delete-dialog.component.html'
})
export class RoomServiceModelDeleteDialogComponent {

    roomService: RoomServiceModel;

    constructor(
        private roomServiceService: RoomServiceModelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.roomServiceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'roomServiceListModification',
                content: 'Deleted an roomService'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-room-service-model-delete-popup',
    template: ''
})
export class RoomServiceModelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomServicePopupService: RoomServiceModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.roomServicePopupService
                .open(RoomServiceModelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
