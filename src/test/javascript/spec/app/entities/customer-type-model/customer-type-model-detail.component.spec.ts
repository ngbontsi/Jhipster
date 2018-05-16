/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GettingstatedTestModule } from '../../../test.module';
import { CustomerTypeModelDetailComponent } from '../../../../../../main/webapp/app/entities/customer-type-model/customer-type-model-detail.component';
import { CustomerTypeModelService } from '../../../../../../main/webapp/app/entities/customer-type-model/customer-type-model.service';
import { CustomerTypeModel } from '../../../../../../main/webapp/app/entities/customer-type-model/customer-type-model.model';

describe('Component Tests', () => {

    describe('CustomerTypeModel Management Detail Component', () => {
        let comp: CustomerTypeModelDetailComponent;
        let fixture: ComponentFixture<CustomerTypeModelDetailComponent>;
        let service: CustomerTypeModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [CustomerTypeModelDetailComponent],
                providers: [
                    CustomerTypeModelService
                ]
            })
            .overrideTemplate(CustomerTypeModelDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerTypeModelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerTypeModelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CustomerTypeModel(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.customerType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
