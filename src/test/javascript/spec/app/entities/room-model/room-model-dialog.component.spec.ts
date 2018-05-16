/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomModelDialogComponent } from '../../../../../../main/webapp/app/entities/room-model/room-model-dialog.component';
import { RoomModelService } from '../../../../../../main/webapp/app/entities/room-model/room-model.service';
import { RoomModel } from '../../../../../../main/webapp/app/entities/room-model/room-model.model';
import { BookingModelService } from '../../../../../../main/webapp/app/entities/booking-model';
import { RoomTypeModelService } from '../../../../../../main/webapp/app/entities/room-type-model';

describe('Component Tests', () => {

    describe('RoomModel Management Dialog Component', () => {
        let comp: RoomModelDialogComponent;
        let fixture: ComponentFixture<RoomModelDialogComponent>;
        let service: RoomModelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomModelDialogComponent],
                providers: [
                    BookingModelService,
                    RoomTypeModelService,
                    RoomModelService
                ]
            })
            .overrideTemplate(RoomModelDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomModelDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomModelService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RoomModel(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.room = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'roomListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RoomModel();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.room = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'roomListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
