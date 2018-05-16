/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GettingstatedTestModule } from '../../../test.module';
import { CustomerModelDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/customer-model/customer-model-delete-dialog.component';
import { CustomerModelService } from '../../../../../../main/webapp/app/entities/customer-model/customer-model.service';

describe('Component Tests', () => {

    describe('CustomerModel Management Delete Component', () => {
        let comp: CustomerModelDeleteDialogComponent;
        let fixture: ComponentFixture<CustomerModelDeleteDialogComponent>;
        let service: CustomerModelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [CustomerModelDeleteDialogComponent],
                providers: [
                    CustomerModelService
                ]
            })
            .overrideTemplate(CustomerModelDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerModelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerModelService);
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
