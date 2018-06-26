/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GettingstatedTestModule } from '../../../test.module';
import { BillModelDialogComponent } from '../../../../../../main/webapp/app/entities/bill-model/bill-model-dialog.component';
import { BillModelService } from '../../../../../../main/webapp/app/entities/bill-model/bill-model.service';
import { BillModel } from '../../../../../../main/webapp/app/entities/bill-model/bill-model.model';
import { CustomerModelService } from '../../../../../../main/webapp/app/entities/customer-model';
import { RoomServiceModelService } from '../../../../../../main/webapp/app/entities/room-service-model';
import { BookingModelService } from '../../../../../../main/webapp/app/entities/booking-model';

describe('Component Tests', () => {

    describe('BillModel Management Dialog Component', () => {
        let comp: BillModelDialogComponent;
        let fixture: ComponentFixture<BillModelDialogComponent>;
        let service: BillModelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [BillModelDialogComponent],
                providers: [
                    CustomerModelService,
                    RoomServiceModelService,
                    BookingModelService,
                    BillModelService
                ]
            })
            .overrideTemplate(BillModelDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillModelDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillModelService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BillModel(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.bill = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'billListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BillModel();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.bill = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'billListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
