import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RoomServiceModel } from './room-service-model.model';
import { RoomServiceModelService } from './room-service-model.service';

@Injectable()
export class RoomServiceModelPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private roomServiceService: RoomServiceModelService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.roomServiceService.find(id)
                    .subscribe((roomServiceResponse: HttpResponse<RoomServiceModel>) => {
                        const roomService: RoomServiceModel = roomServiceResponse.body;
                        this.ngbModalRef = this.roomServiceModalRef(component, roomService);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.roomServiceModalRef(component, new RoomServiceModel());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    roomServiceModalRef(component: Component, roomService: RoomServiceModel): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.roomService = roomService;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
