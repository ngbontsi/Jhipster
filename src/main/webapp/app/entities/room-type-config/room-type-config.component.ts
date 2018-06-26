import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoomTypeConfig } from './room-type-config.model';
import { RoomTypeConfigService } from './room-type-config.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-room-type-config',
    templateUrl: './room-type-config.component.html'
})
export class RoomTypeConfigComponent implements OnInit, OnDestroy {
roomTypes: RoomTypeConfig[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private roomTypeService: RoomTypeConfigService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.roomTypeService.query().subscribe(
            (res: HttpResponse<RoomTypeConfig[]>) => {
                this.roomTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRoomTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RoomTypeConfig) {
        return item.id;
    }
    registerChangeInRoomTypes() {
        this.eventSubscriber = this.eventManager.subscribe('roomTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
