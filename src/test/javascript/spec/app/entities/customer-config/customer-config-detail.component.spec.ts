/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GettingstatedTestModule } from '../../../test.module';
import { CustomerConfigDetailComponent } from '../../../../../../main/webapp/app/entities/customer-config/customer-config-detail.component';
import { CustomerConfigService } from '../../../../../../main/webapp/app/entities/customer-config/customer-config.service';
import { CustomerConfig } from '../../../../../../main/webapp/app/entities/customer-config/customer-config.model';

describe('Component Tests', () => {

    describe('CustomerConfig Management Detail Component', () => {
        let comp: CustomerConfigDetailComponent;
        let fixture: ComponentFixture<CustomerConfigDetailComponent>;
        let service: CustomerConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [CustomerConfigDetailComponent],
                providers: [
                    CustomerConfigService
                ]
            })
            .overrideTemplate(CustomerConfigDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerConfigDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CustomerConfig(123)
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
