/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomTypeModelDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/room-type-model/room-type-model-delete-dialog.component';
import { RoomTypeModelService } from '../../../../../../main/webapp/app/entities/room-type-model/room-type-model.service';

describe('Component Tests', () => {

    describe('RoomTypeModel Management Delete Component', () => {
        let comp: RoomTypeModelDeleteDialogComponent;
        let fixture: ComponentFixture<RoomTypeModelDeleteDialogComponent>;
        let service: RoomTypeModelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomTypeModelDeleteDialogComponent],
                providers: [
                    RoomTypeModelService
                ]
            })
            .overrideTemplate(RoomTypeModelDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomTypeModelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomTypeModelService);
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
