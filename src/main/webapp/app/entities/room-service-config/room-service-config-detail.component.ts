import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RoomServiceConfig } from './room-service-config.model';
import { RoomServiceConfigService } from './room-service-config.service';

@Component({
    selector: 'jhi-room-service-config-detail',
    templateUrl: './room-service-config-detail.component.html'
})
export class RoomServiceConfigDetailComponent implements OnInit, OnDestroy {

    roomService: RoomServiceConfig;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private roomServiceService: RoomServiceConfigService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRoomServices();
    }

    load(id) {
        this.roomServiceService.find(id)
            .subscribe((roomServiceResponse: HttpResponse<RoomServiceConfig>) => {
                this.roomService = roomServiceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRoomServices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'roomServiceListModification',
            (response) => this.load(this.roomService.id)
        );
    }
}
