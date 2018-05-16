/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GettingstatedTestModule } from '../../../test.module';
import { CustomerTypeModelDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/customer-type-model/customer-type-model-delete-dialog.component';
import { CustomerTypeModelService } from '../../../../../../main/webapp/app/entities/customer-type-model/customer-type-model.service';

describe('Component Tests', () => {

    describe('CustomerTypeModel Management Delete Component', () => {
        let comp: CustomerTypeModelDeleteDialogComponent;
        let fixture: ComponentFixture<CustomerTypeModelDeleteDialogComponent>;
        let service: CustomerTypeModelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [CustomerTypeModelDeleteDialogComponent],
                providers: [
                    CustomerTypeModelService
                ]
            })
            .overrideTemplate(CustomerTypeModelDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerTypeModelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerTypeModelService);
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
