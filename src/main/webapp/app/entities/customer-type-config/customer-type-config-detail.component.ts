import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerTypeConfig } from './customer-type-config.model';
import { CustomerTypeConfigService } from './customer-type-config.service';

@Component({
    selector: 'jhi-customer-type-config-detail',
    templateUrl: './customer-type-config-detail.component.html'
})
export class CustomerTypeConfigDetailComponent implements OnInit, OnDestroy {

    customerType: CustomerTypeConfig;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private customerTypeService: CustomerTypeConfigService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCustomerTypes();
    }

    load(id) {
        this.customerTypeService.find(id)
            .subscribe((customerTypeResponse: HttpResponse<CustomerTypeConfig>) => {
                this.customerType = customerTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCustomerTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'customerTypeListModification',
            (response) => this.load(this.customerType.id)
        );
    }
}
