import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BookingModel } from './booking-model.model';
import { BookingModelService } from './booking-model.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-booking-model',
    templateUrl: './booking-model.component.html'
})
export class BookingModelComponent implements OnInit, OnDestroy {
bookings: BookingModel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bookingService: BookingModelService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bookingService.query().subscribe(
            (res: HttpResponse<BookingModel[]>) => {
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

    trackId(index: number, item: BookingModel) {
        return item.id;
    }
    registerChangeInBookings() {
        this.eventSubscriber = this.eventManager.subscribe('bookingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
