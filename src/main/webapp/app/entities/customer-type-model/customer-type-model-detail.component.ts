import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerTypeModel } from './customer-type-model.model';
import { CustomerTypeModelService } from './customer-type-model.service';

@Component({
    selector: 'jhi-customer-type-model-detail',
    templateUrl: './customer-type-model-detail.component.html'
})
export class CustomerTypeModelDetailComponent implements OnInit, OnDestroy {

    customerType: CustomerTypeModel;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private customerTypeService: CustomerTypeModelService,
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
            .subscribe((customerTypeResponse: HttpResponse<CustomerTypeModel>) => {
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
