import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RoomServiceModel } from './room-service-model.model';
import { RoomServiceModelService } from './room-service-model.service';

@Component({
    selector: 'jhi-room-service-model-detail',
    templateUrl: './room-service-model-detail.component.html'
})
export class RoomServiceModelDetailComponent implements OnInit, OnDestroy {

    roomService: RoomServiceModel;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private roomServiceService: RoomServiceModelService,
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
            .subscribe((roomServiceResponse: HttpResponse<RoomServiceModel>) => {
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
