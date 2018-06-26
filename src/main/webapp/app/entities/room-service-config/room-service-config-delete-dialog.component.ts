import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoomServiceConfig } from './room-service-config.model';
import { RoomServiceConfigPopupService } from './room-service-config-popup.service';
import { RoomServiceConfigService } from './room-service-config.service';

@Component({
    selector: 'jhi-room-service-config-delete-dialog',
    templateUrl: './room-service-config-delete-dialog.component.html'
})
export class RoomServiceConfigDeleteDialogComponent {

    roomService: RoomServiceConfig;

    constructor(
        private roomServiceService: RoomServiceConfigService,
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
    selector: 'jhi-room-service-config-delete-popup',
    template: ''
})
export class RoomServiceConfigDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomServicePopupService: RoomServiceConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.roomServicePopupService
                .open(RoomServiceConfigDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
