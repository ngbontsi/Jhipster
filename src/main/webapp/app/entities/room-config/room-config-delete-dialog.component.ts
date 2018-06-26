import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoomConfig } from './room-config.model';
import { RoomConfigPopupService } from './room-config-popup.service';
import { RoomConfigService } from './room-config.service';

@Component({
    selector: 'jhi-room-config-delete-dialog',
    templateUrl: './room-config-delete-dialog.component.html'
})
export class RoomConfigDeleteDialogComponent {

    room: RoomConfig;

    constructor(
        private roomService: RoomConfigService,
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
    selector: 'jhi-room-config-delete-popup',
    template: ''
})
export class RoomConfigDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomPopupService: RoomConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.roomPopupService
                .open(RoomConfigDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
