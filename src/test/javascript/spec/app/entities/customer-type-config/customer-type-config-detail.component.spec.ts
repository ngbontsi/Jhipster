/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GettingstatedTestModule } from '../../../test.module';
import { CustomerTypeConfigDetailComponent } from '../../../../../../main/webapp/app/entities/customer-type-config/customer-type-config-detail.component';
import { CustomerTypeConfigService } from '../../../../../../main/webapp/app/entities/customer-type-config/customer-type-config.service';
import { CustomerTypeConfig } from '../../../../../../main/webapp/app/entities/customer-type-config/customer-type-config.model';

describe('Component Tests', () => {

    describe('CustomerTypeConfig Management Detail Component', () => {
        let comp: CustomerTypeConfigDetailComponent;
        let fixture: ComponentFixture<CustomerTypeConfigDetailComponent>;
        let service: CustomerTypeConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [CustomerTypeConfigDetailComponent],
                providers: [
                    CustomerTypeConfigService
                ]
            })
            .overrideTemplate(CustomerTypeConfigDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerTypeConfigDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerTypeConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CustomerTypeConfig(123)
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
