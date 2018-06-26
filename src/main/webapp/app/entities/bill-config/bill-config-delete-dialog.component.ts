import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BillConfig } from './bill-config.model';
import { BillConfigPopupService } from './bill-config-popup.service';
import { BillConfigService } from './bill-config.service';

@Component({
    selector: 'jhi-bill-config-delete-dialog',
    templateUrl: './bill-config-delete-dialog.component.html'
})
export class BillConfigDeleteDialogComponent {

    bill: BillConfig;

    constructor(
        private billService: BillConfigService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.billService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'billListModification',
                content: 'Deleted an bill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bill-config-delete-popup',
    template: ''
})
export class BillConfigDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billPopupService: BillConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.billPopupService
                .open(BillConfigDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
