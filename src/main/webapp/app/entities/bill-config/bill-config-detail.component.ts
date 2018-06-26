import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BillConfig } from './bill-config.model';
import { BillConfigService } from './bill-config.service';

@Component({
    selector: 'jhi-bill-config-detail',
    templateUrl: './bill-config-detail.component.html'
})
export class BillConfigDetailComponent implements OnInit, OnDestroy {

    bill: BillConfig;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private billService: BillConfigService,
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
            .subscribe((billResponse: HttpResponse<BillConfig>) => {
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
