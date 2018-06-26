import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoomTypeConfig } from './room-type-config.model';
import { RoomTypeConfigPopupService } from './room-type-config-popup.service';
import { RoomTypeConfigService } from './room-type-config.service';

@Component({
    selector: 'jhi-room-type-config-delete-dialog',
    templateUrl: './room-type-config-delete-dialog.component.html'
})
export class RoomTypeConfigDeleteDialogComponent {

    roomType: RoomTypeConfig;

    constructor(
        private roomTypeService: RoomTypeConfigService,
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
    selector: 'jhi-room-type-config-delete-popup',
    template: ''
})
export class RoomTypeConfigDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomTypePopupService: RoomTypeConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.roomTypePopupService
                .open(RoomTypeConfigDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
