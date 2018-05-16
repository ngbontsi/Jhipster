import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BillModel } from './bill-model.model';
import { BillModelService } from './bill-model.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-bill-model',
    templateUrl: './bill-model.component.html'
})
export class BillModelComponent implements OnInit, OnDestroy {
bills: BillModel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private billService: BillModelService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.billService.query().subscribe(
            (res: HttpResponse<BillModel[]>) => {
                this.bills = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBills();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BillModel) {
        return item.id;
    }
    registerChangeInBills() {
        this.eventSubscriber = this.eventManager.subscribe('billListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
