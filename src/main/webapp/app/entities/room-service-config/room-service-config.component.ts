import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoomServiceConfig } from './room-service-config.model';
import { RoomServiceConfigService } from './room-service-config.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-room-service-config',
    templateUrl: './room-service-config.component.html'
})
export class RoomServiceConfigComponent implements OnInit, OnDestroy {
roomServices: RoomServiceConfig[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private roomServiceService: RoomServiceConfigService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.roomServiceService.query().subscribe(
            (res: HttpResponse<RoomServiceConfig[]>) => {
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

    trackId(index: number, item: RoomServiceConfig) {
        return item.id;
    }
    registerChangeInRoomServices() {
        this.eventSubscriber = this.eventManager.subscribe('roomServiceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
