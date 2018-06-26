import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RoomTypeConfig } from './room-type-config.model';
import { RoomTypeConfigService } from './room-type-config.service';

@Component({
    selector: 'jhi-room-type-config-detail',
    templateUrl: './room-type-config-detail.component.html'
})
export class RoomTypeConfigDetailComponent implements OnInit, OnDestroy {

    roomType: RoomTypeConfig;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private roomTypeService: RoomTypeConfigService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRoomTypes();
    }

    load(id) {
        this.roomTypeService.find(id)
            .subscribe((roomTypeResponse: HttpResponse<RoomTypeConfig>) => {
                this.roomType = roomTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRoomTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'roomTypeListModification',
            (response) => this.load(this.roomType.id)
        );
    }
}
