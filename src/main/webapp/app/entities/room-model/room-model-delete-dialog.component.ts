import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoomModel } from './room-model.model';
import { RoomModelPopupService } from './room-model-popup.service';
import { RoomModelService } from './room-model.service';

@Component({
    selector: 'jhi-room-model-delete-dialog',
    templateUrl: './room-model-delete-dialog.component.html'
})
export class RoomModelDeleteDialogComponent {

    room: RoomModel;

    constructor(
        private roomService: RoomModelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.roomService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'roomListModification',
                content: 'Deleted an room'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-room-model-delete-popup',
    template: ''
})
export class RoomModelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomPopupService: RoomModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.roomPopupService
                .open(RoomModelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
