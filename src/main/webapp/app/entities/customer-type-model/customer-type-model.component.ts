import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerTypeModel } from './customer-type-model.model';
import { CustomerTypeModelService } from './customer-type-model.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-customer-type-model',
    templateUrl: './customer-type-model.component.html'
})
export class CustomerTypeModelComponent implements OnInit, OnDestroy {
customerTypes: CustomerTypeModel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private customerTypeService: CustomerTypeModelService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.customerTypeService.query().subscribe(
            (res: HttpResponse<CustomerTypeModel[]>) => {
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

    trackId(index: number, item: CustomerTypeModel) {
        return item.id;
    }
    registerChangeInCustomerTypes() {
        this.eventSubscriber = this.eventManager.subscribe('customerTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
