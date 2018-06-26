import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CustomerTypeConfig } from './customer-type-config.model';
import { CustomerTypeConfigService } from './customer-type-config.service';

@Injectable()
export class CustomerTypeConfigPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private customerTypeService: CustomerTypeConfigService

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
                this.customerTypeService.find(id)
                    .subscribe((customerTypeResponse: HttpResponse<CustomerTypeConfig>) => {
                        const customerType: CustomerTypeConfig = customerTypeResponse.body;
                        this.ngbModalRef = this.customerTypeModalRef(component, customerType);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.customerTypeModalRef(component, new CustomerTypeConfig());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    customerTypeModalRef(component: Component, customerType: CustomerTypeConfig): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerType = customerType;
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
