/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GettingstatedTestModule } from '../../../test.module';
import { CustomerConfigComponent } from '../../../../../../main/webapp/app/entities/customer-config/customer-config.component';
import { CustomerConfigService } from '../../../../../../main/webapp/app/entities/customer-config/customer-config.service';
import { CustomerConfig } from '../../../../../../main/webapp/app/entities/customer-config/customer-config.model';

describe('Component Tests', () => {

    describe('CustomerConfig Management Component', () => {
        let comp: CustomerConfigComponent;
        let fixture: ComponentFixture<CustomerConfigComponent>;
        let service: CustomerConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [CustomerConfigComponent],
                providers: [
                    CustomerConfigService
                ]
            })
            .overrideTemplate(CustomerConfigComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerConfigComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CustomerConfig(123)],
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
