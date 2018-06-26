/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GettingstatedTestModule } from '../../../test.module';
import { CustomerConfigDialogComponent } from '../../../../../../main/webapp/app/entities/customer-config/customer-config-dialog.component';
import { CustomerConfigService } from '../../../../../../main/webapp/app/entities/customer-config/customer-config.service';
import { CustomerConfig } from '../../../../../../main/webapp/app/entities/customer-config/customer-config.model';
import { CustomerTypeConfigService } from '../../../../../../main/webapp/app/entities/customer-type-config';
import { BillConfigService } from '../../../../../../main/webapp/app/entities/bill-config';

describe('Component Tests', () => {

    describe('CustomerConfig Management Dialog Component', () => {
        let comp: CustomerConfigDialogComponent;
        let fixture: ComponentFixture<CustomerConfigDialogComponent>;
        let service: CustomerConfigService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [CustomerConfigDialogComponent],
                providers: [
                    CustomerTypeConfigService,
                    BillConfigService,
                    CustomerConfigService
                ]
            })
            .overrideTemplate(CustomerConfigDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerConfigDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerConfigService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CustomerConfig(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.customer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'customerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CustomerConfig();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.customer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'customerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
