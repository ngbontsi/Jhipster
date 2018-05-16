/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GettingstatedTestModule } from '../../../test.module';
import { BillModelComponent } from '../../../../../../main/webapp/app/entities/bill-model/bill-model.component';
import { BillModelService } from '../../../../../../main/webapp/app/entities/bill-model/bill-model.service';
import { BillModel } from '../../../../../../main/webapp/app/entities/bill-model/bill-model.model';

describe('Component Tests', () => {

    describe('BillModel Management Component', () => {
        let comp: BillModelComponent;
        let fixture: ComponentFixture<BillModelComponent>;
        let service: BillModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [BillModelComponent],
                providers: [
                    BillModelService
                ]
            })
            .overrideTemplate(BillModelComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillModelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillModelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BillModel(123)],
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
