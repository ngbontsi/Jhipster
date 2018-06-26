import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BookingConfig } from './booking-config.model';
import { BookingConfigService } from './booking-config.service';

@Component({
    selector: 'jhi-booking-config-detail',
    templateUrl: './booking-config-detail.component.html'
})
export class BookingConfigDetailComponent implements OnInit, OnDestroy {

    booking: BookingConfig;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bookingService: BookingConfigService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBookings();
    }

    load(id) {
        this.bookingService.find(id)
            .subscribe((bookingResponse: HttpResponse<BookingConfig>) => {
                this.booking = bookingResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBookings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bookingListModification',
            (response) => this.load(this.booking.id)
        );
    }
}
