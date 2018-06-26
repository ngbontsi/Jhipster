import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerTypeConfig } from './customer-type-config.model';
import { CustomerTypeConfigService } from './customer-type-config.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-customer-type-config',
    templateUrl: './customer-type-config.component.html'
})
export class CustomerTypeConfigComponent implements OnInit, OnDestroy {
customerTypes: CustomerTypeConfig[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private customerTypeService: CustomerTypeConfigService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.customerTypeService.query().subscribe(
            (res: HttpResponse<CustomerTypeConfig[]>) => {
                this.customerTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomerTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CustomerTypeConfig) {
        return item.id;
    }
    registerChangeInCustomerTypes() {
        this.eventSubscriber = this.eventManager.subscribe('customerTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
