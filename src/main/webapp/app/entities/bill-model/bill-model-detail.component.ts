import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BillModel } from './bill-model.model';
import { BillModelService } from './bill-model.service';

@Component({
    selector: 'jhi-bill-model-detail',
    templateUrl: './bill-model-detail.component.html'
})
export class BillModelDetailComponent implements OnInit, OnDestroy {

    bill: BillModel;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private billService: BillModelService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBills();
    }

    load(id) {
        this.billService.find(id)
            .subscribe((billResponse: HttpResponse<BillModel>) => {
                this.bill = billResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBills() {
        this.eventSubscriber = this.eventManager.subscribe(
            'billListModification',
            (response) => this.load(this.bill.id)
        );
    }
}
