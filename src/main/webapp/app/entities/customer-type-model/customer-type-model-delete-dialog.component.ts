import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerTypeModel } from './customer-type-model.model';
import { CustomerTypeModelPopupService } from './customer-type-model-popup.service';
import { CustomerTypeModelService } from './customer-type-model.service';

@Component({
    selector: 'jhi-customer-type-model-delete-dialog',
    templateUrl: './customer-type-model-delete-dialog.component.html'
})
export class CustomerTypeModelDeleteDialogComponent {

    customerType: CustomerTypeModel;

    constructor(
        private customerTypeService: CustomerTypeModelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customerTypeListModification',
                content: 'Deleted an customerType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-type-model-delete-popup',
    template: ''
})
export class CustomerTypeModelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerTypePopupService: CustomerTypeModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customerTypePopupService
                .open(CustomerTypeModelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
