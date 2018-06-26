import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RoomConfig } from './room-config.model';
import { RoomConfigService } from './room-config.service';

@Component({
    selector: 'jhi-room-config-detail',
    templateUrl: './room-config-detail.component.html'
})
export class RoomConfigDetailComponent implements OnInit, OnDestroy {

    room: RoomConfig;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private roomService: RoomConfigService,
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
            .subscribe((roomResponse: HttpResponse<RoomConfig>) => {
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
