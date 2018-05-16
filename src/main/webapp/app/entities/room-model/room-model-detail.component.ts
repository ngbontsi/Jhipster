import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RoomModel } from './room-model.model';
import { RoomModelService } from './room-model.service';

@Component({
    selector: 'jhi-room-model-detail',
    templateUrl: './room-model-detail.component.html'
})
export class RoomModelDetailComponent implements OnInit, OnDestroy {

    room: RoomModel;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private roomService: RoomModelService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRooms();
    }

    load(id) {
        this.roomService.find(id)
            .subscribe((roomResponse: HttpResponse<RoomModel>) => {
                this.room = roomResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRooms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'roomListModification',
            (response) => this.load(this.room.id)
        );
    }
}
