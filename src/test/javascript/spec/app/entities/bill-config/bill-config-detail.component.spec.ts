/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GettingstatedTestModule } from '../../../test.module';
import { BillConfigDetailComponent } from '../../../../../../main/webapp/app/entities/bill-config/bill-config-detail.component';
import { BillConfigService } from '../../../../../../main/webapp/app/entities/bill-config/bill-config.service';
import { BillConfig } from '../../../../../../main/webapp/app/entities/bill-config/bill-config.model';

describe('Component Tests', () => {

    describe('BillConfig Management Detail Component', () => {
        let comp: BillConfigDetailComponent;
        let fixture: ComponentFixture<BillConfigDetailComponent>;
        let service: BillConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [BillConfigDetailComponent],
                providers: [
                    BillConfigService
                ]
            })
            .overrideTemplate(BillConfigDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillConfigDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BillConfig(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bill).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
