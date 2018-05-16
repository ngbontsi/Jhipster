/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomModelDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/room-model/room-model-delete-dialog.component';
import { RoomModelService } from '../../../../../../main/webapp/app/entities/room-model/room-model.service';

describe('Component Tests', () => {

    describe('RoomModel Management Delete Component', () => {
        let comp: RoomModelDeleteDialogComponent;
        let fixture: ComponentFixture<RoomModelDeleteDialogComponent>;
        let service: RoomModelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomModelDeleteDialogComponent],
                providers: [
                    RoomModelService
                ]
            })
            .overrideTemplate(RoomModelDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomModelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomModelService);
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
