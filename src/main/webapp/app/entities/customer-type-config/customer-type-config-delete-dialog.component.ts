import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerTypeConfig } from './customer-type-config.model';
import { CustomerTypeConfigPopupService } from './customer-type-config-popup.service';
import { CustomerTypeConfigService } from './customer-type-config.service';

@Component({
    selector: 'jhi-customer-type-config-delete-dialog',
    templateUrl: './customer-type-config-delete-dialog.component.html'
})
export class CustomerTypeConfigDeleteDialogComponent {

    customerType: CustomerTypeConfig;

    constructor(
        private customerTypeService: CustomerTypeConfigService,
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
    selector: 'jhi-customer-type-config-delete-popup',
    template: ''
})
export class CustomerTypeConfigDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerTypePopupService: CustomerTypeConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customerTypePopupService
                .open(CustomerTypeConfigDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
