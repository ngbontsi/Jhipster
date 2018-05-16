/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GettingstatedTestModule } from '../../../test.module';
import { BookingModelDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/booking-model/booking-model-delete-dialog.component';
import { BookingModelService } from '../../../../../../main/webapp/app/entities/booking-model/booking-model.service';

describe('Component Tests', () => {

    describe('BookingModel Management Delete Component', () => {
        let comp: BookingModelDeleteDialogComponent;
        let fixture: ComponentFixture<BookingModelDeleteDialogComponent>;
        let service: BookingModelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [BookingModelDeleteDialogComponent],
                providers: [
                    BookingModelService
                ]
            })
            .overrideTemplate(BookingModelDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookingModelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookingModelService);
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
