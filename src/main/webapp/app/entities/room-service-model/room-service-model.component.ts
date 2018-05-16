import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoomServiceModel } from './room-service-model.model';
import { RoomServiceModelService } from './room-service-model.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-room-service-model',
    templateUrl: './room-service-model.component.html'
})
export class RoomServiceModelComponent implements OnInit, OnDestroy {
roomServices: RoomServiceModel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private roomServiceService: RoomServiceModelService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.roomServiceService.query().subscribe(
            (res: HttpResponse<RoomServiceModel[]>) => {
                this.roomServices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRoomServices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RoomServiceModel) {
        return item.id;
    }
    registerChangeInRoomServices() {
        this.eventSubscriber = this.eventManager.subscribe('roomServiceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
