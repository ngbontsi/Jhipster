import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BookingModel } from './booking-model.model';
import { BookingModelPopupService } from './booking-model-popup.service';
import { BookingModelService } from './booking-model.service';

@Component({
    selector: 'jhi-booking-model-delete-dialog',
    templateUrl: './booking-model-delete-dialog.component.html'
})
export class BookingModelDeleteDialogComponent {

    booking: BookingModel;

    constructor(
        private bookingService: BookingModelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bookingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bookingListModification',
                content: 'Deleted an booking'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-booking-model-delete-popup',
    template: ''
})
export class BookingModelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bookingPopupService: BookingModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bookingPopupService
                .open(BookingModelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
