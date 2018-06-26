/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GettingstatedTestModule } from '../../../test.module';
import { CustomerTypeConfigDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/customer-type-config/customer-type-config-delete-dialog.component';
import { CustomerTypeConfigService } from '../../../../../../main/webapp/app/entities/customer-type-config/customer-type-config.service';

describe('Component Tests', () => {

    describe('CustomerTypeConfig Management Delete Component', () => {
        let comp: CustomerTypeConfigDeleteDialogComponent;
        let fixture: ComponentFixture<CustomerTypeConfigDeleteDialogComponent>;
        let service: CustomerTypeConfigService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [CustomerTypeConfigDeleteDialogComponent],
                providers: [
                    CustomerTypeConfigService
                ]
            })
            .overrideTemplate(CustomerTypeConfigDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerTypeConfigDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerTypeConfigService);
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
