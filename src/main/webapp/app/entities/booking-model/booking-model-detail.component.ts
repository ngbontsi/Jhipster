import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BookingModel } from './booking-model.model';
import { BookingModelService } from './booking-model.service';

@Component({
    selector: 'jhi-booking-model-detail',
    templateUrl: './booking-model-detail.component.html'
})
export class BookingModelDetailComponent implements OnInit, OnDestroy {

    booking: BookingModel;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bookingService: BookingModelService,
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
            .subscribe((bookingResponse: HttpResponse<BookingModel>) => {
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
