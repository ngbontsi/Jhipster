/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GettingstatedTestModule } from '../../../test.module';
import { BillConfigComponent } from '../../../../../../main/webapp/app/entities/bill-config/bill-config.component';
import { BillConfigService } from '../../../../../../main/webapp/app/entities/bill-config/bill-config.service';
import { BillConfig } from '../../../../../../main/webapp/app/entities/bill-config/bill-config.model';

describe('Component Tests', () => {

    describe('BillConfig Management Component', () => {
        let comp: BillConfigComponent;
        let fixture: ComponentFixture<BillConfigComponent>;
        let service: BillConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [BillConfigComponent],
                providers: [
                    BillConfigService
                ]
            })
            .overrideTemplate(BillConfigComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillConfigComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BillConfig(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bills[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
