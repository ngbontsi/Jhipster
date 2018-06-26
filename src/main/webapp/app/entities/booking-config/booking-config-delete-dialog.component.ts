import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BookingConfig } from './booking-config.model';
import { BookingConfigPopupService } from './booking-config-popup.service';
import { BookingConfigService } from './booking-config.service';

@Component({
    selector: 'jhi-booking-config-delete-dialog',
    templateUrl: './booking-config-delete-dialog.component.html'
})
export class BookingConfigDeleteDialogComponent {

    booking: BookingConfig;

    constructor(
        private bookingService: BookingConfigService,
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
    selector: 'jhi-booking-config-delete-popup',
    template: ''
})
export class BookingConfigDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bookingPopupService: BookingConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bookingPopupService
                .open(BookingConfigDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
