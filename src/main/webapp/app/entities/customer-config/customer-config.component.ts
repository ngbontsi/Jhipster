import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerConfig } from './customer-config.model';
import { CustomerConfigService } from './customer-config.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-customer-config',
    templateUrl: './customer-config.component.html'
})
export class CustomerConfigComponent implements OnInit, OnDestroy {
customers: CustomerConfig[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private customerService: CustomerConfigService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.customerService.query().subscribe(
            (res: HttpResponse<CustomerConfig[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CustomerConfig) {
        return item.id;
    }
    registerChangeInCustomers() {
        this.eventSubscriber = this.eventManager.subscribe('customerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
