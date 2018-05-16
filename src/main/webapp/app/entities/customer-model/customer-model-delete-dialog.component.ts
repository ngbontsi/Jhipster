import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerModel } from './customer-model.model';
import { CustomerModelPopupService } from './customer-model-popup.service';
import { CustomerModelService } from './customer-model.service';

@Component({
    selector: 'jhi-customer-model-delete-dialog',
    templateUrl: './customer-model-delete-dialog.component.html'
})
export class CustomerModelDeleteDialogComponent {

    customer: CustomerModel;

    constructor(
        private customerService: CustomerModelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customerListModification',
                content: 'Deleted an customer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-model-delete-popup',
    template: ''
})
export class CustomerModelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerPopupService: CustomerModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customerPopupService
                .open(CustomerModelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
