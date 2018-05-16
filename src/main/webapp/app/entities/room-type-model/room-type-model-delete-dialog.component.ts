import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoomTypeModel } from './room-type-model.model';
import { RoomTypeModelPopupService } from './room-type-model-popup.service';
import { RoomTypeModelService } from './room-type-model.service';

@Component({
    selector: 'jhi-room-type-model-delete-dialog',
    templateUrl: './room-type-model-delete-dialog.component.html'
})
export class RoomTypeModelDeleteDialogComponent {

    roomType: RoomTypeModel;

    constructor(
        private roomTypeService: RoomTypeModelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.roomTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'roomTypeListModification',
                content: 'Deleted an roomType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-room-type-model-delete-popup',
    template: ''
})
export class RoomTypeModelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomTypePopupService: RoomTypeModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.roomTypePopupService
                .open(RoomTypeModelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
