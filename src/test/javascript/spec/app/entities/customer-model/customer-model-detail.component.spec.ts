/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GettingstatedTestModule } from '../../../test.module';
import { CustomerModelDetailComponent } from '../../../../../../main/webapp/app/entities/customer-model/customer-model-detail.component';
import { CustomerModelService } from '../../../../../../main/webapp/app/entities/customer-model/customer-model.service';
import { CustomerModel } from '../../../../../../main/webapp/app/entities/customer-model/customer-model.model';

describe('Component Tests', () => {

    describe('CustomerModel Management Detail Component', () => {
        let comp: CustomerModelDetailComponent;
        let fixture: ComponentFixture<CustomerModelDetailComponent>;
        let service: CustomerModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [CustomerModelDetailComponent],
                providers: [
                    CustomerModelService
                ]
            })
            .overrideTemplate(CustomerModelDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerModelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerModelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CustomerModel(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.customer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
