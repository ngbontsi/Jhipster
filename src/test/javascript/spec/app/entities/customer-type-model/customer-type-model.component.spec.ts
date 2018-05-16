/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GettingstatedTestModule } from '../../../test.module';
import { CustomerTypeModelComponent } from '../../../../../../main/webapp/app/entities/customer-type-model/customer-type-model.component';
import { CustomerTypeModelService } from '../../../../../../main/webapp/app/entities/customer-type-model/customer-type-model.service';
import { CustomerTypeModel } from '../../../../../../main/webapp/app/entities/customer-type-model/customer-type-model.model';

describe('Component Tests', () => {

    describe('CustomerTypeModel Management Component', () => {
        let comp: CustomerTypeModelComponent;
        let fixture: ComponentFixture<CustomerTypeModelComponent>;
        let service: CustomerTypeModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [CustomerTypeModelComponent],
                providers: [
                    CustomerTypeModelService
                ]
            })
            .overrideTemplate(CustomerTypeModelComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerTypeModelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerTypeModelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CustomerTypeModel(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.customerTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
