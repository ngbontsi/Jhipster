import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BillConfig } from './bill-config.model';
import { BillConfigService } from './bill-config.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-bill-config',
    templateUrl: './bill-config.component.html'
})
export class BillConfigComponent implements OnInit, OnDestroy {
bills: BillConfig[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private billService: BillConfigService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.billService.query().subscribe(
            (res: HttpResponse<BillConfig[]>) => {
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

    trackId(index: number, item: BillConfig) {
        return item.id;
    }
    registerChangeInBills() {
        this.eventSubscriber = this.eventManager.subscribe('billListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
