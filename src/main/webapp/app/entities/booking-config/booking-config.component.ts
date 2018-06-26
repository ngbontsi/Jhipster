import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BookingConfig } from './booking-config.model';
import { BookingConfigService } from './booking-config.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-booking-config',
    templateUrl: './booking-config.component.html'
})
export class BookingConfigComponent implements OnInit, OnDestroy {
bookings: BookingConfig[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bookingService: BookingConfigService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bookingService.query().subscribe(
            (res: HttpResponse<BookingConfig[]>) => {
                this.bookings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBookings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BookingConfig) {
        return item.id;
    }
    registerChangeInBookings() {
        this.eventSubscriber = this.eventManager.subscribe('bookingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
