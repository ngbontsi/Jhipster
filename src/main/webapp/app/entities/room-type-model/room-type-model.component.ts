import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoomTypeModel } from './room-type-model.model';
import { RoomTypeModelService } from './room-type-model.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-room-type-model',
    templateUrl: './room-type-model.component.html'
})
export class RoomTypeModelComponent implements OnInit, OnDestroy {
roomTypes: RoomTypeModel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private roomTypeService: RoomTypeModelService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.roomTypeService.query().subscribe(
            (res: HttpResponse<RoomTypeModel[]>) => {
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

    trackId(index: number, item: RoomTypeModel) {
        return item.id;
    }
    registerChangeInRoomTypes() {
        this.eventSubscriber = this.eventManager.subscribe('roomTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
