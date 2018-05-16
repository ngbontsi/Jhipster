import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RoomTypeModel } from './room-type-model.model';
import { RoomTypeModelService } from './room-type-model.service';

@Component({
    selector: 'jhi-room-type-model-detail',
    templateUrl: './room-type-model-detail.component.html'
})
export class RoomTypeModelDetailComponent implements OnInit, OnDestroy {

    roomType: RoomTypeModel;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private roomTypeService: RoomTypeModelService,
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
            .subscribe((roomTypeResponse: HttpResponse<RoomTypeModel>) => {
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
