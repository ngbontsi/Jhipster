import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BillModel } from './bill-model.model';
import { BillModelPopupService } from './bill-model-popup.service';
import { BillModelService } from './bill-model.service';

@Component({
    selector: 'jhi-bill-model-delete-dialog',
    templateUrl: './bill-model-delete-dialog.component.html'
})
export class BillModelDeleteDialogComponent {

    bill: BillModel;

    constructor(
        private billService: BillModelService,
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
    selector: 'jhi-bill-model-delete-popup',
    template: ''
})
export class BillModelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billPopupService: BillModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.billPopupService
                .open(BillModelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
