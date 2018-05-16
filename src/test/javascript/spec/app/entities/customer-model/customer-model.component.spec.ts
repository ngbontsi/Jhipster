/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GettingstatedTestModule } from '../../../test.module';
import { CustomerModelComponent } from '../../../../../../main/webapp/app/entities/customer-model/customer-model.component';
import { CustomerModelService } from '../../../../../../main/webapp/app/entities/customer-model/customer-model.service';
import { CustomerModel } from '../../../../../../main/webapp/app/entities/customer-model/customer-model.model';

describe('Component Tests', () => {

    describe('CustomerModel Management Component', () => {
        let comp: CustomerModelComponent;
        let fixture: ComponentFixture<CustomerModelComponent>;
        let service: CustomerModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [CustomerModelComponent],
                providers: [
                    CustomerModelService
                ]
            })
            .overrideTemplate(CustomerModelComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerModelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerModelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CustomerModel(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.customers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
