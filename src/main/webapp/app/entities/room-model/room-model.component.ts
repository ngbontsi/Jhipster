import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoomModel } from './room-model.model';
import { RoomModelService } from './room-model.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-room-model',
    templateUrl: './room-model.component.html'
})
export class RoomModelComponent implements OnInit, OnDestroy {
rooms: RoomModel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private roomService: RoomModelService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.roomService.query().subscribe(
            (res: HttpResponse<RoomModel[]>) => {
                this.rooms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRooms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RoomModel) {
        return item.id;
    }
    registerChangeInRooms() {
        this.eventSubscriber = this.eventManager.subscribe('roomListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
