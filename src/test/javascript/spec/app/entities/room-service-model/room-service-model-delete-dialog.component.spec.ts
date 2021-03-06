/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomServiceModelDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/room-service-model/room-service-model-delete-dialog.component';
import { RoomServiceModelService } from '../../../../../../main/webapp/app/entities/room-service-model/room-service-model.service';

describe('Component Tests', () => {

    describe('RoomServiceModel Management Delete Component', () => {
        let comp: RoomServiceModelDeleteDialogComponent;
        let fixture: ComponentFixture<RoomServiceModelDeleteDialogComponent>;
        let service: RoomServiceModelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomServiceModelDeleteDialogComponent],
                providers: [
                    RoomServiceModelService
                ]
            })
            .overrideTemplate(RoomServiceModelDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomServiceModelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomServiceModelService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
