/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GettingstatedTestModule } from '../../../test.module';
import { BillModelDetailComponent } from '../../../../../../main/webapp/app/entities/bill-model/bill-model-detail.component';
import { BillModelService } from '../../../../../../main/webapp/app/entities/bill-model/bill-model.service';
import { BillModel } from '../../../../../../main/webapp/app/entities/bill-model/bill-model.model';

describe('Component Tests', () => {

    describe('BillModel Management Detail Component', () => {
        let comp: BillModelDetailComponent;
        let fixture: ComponentFixture<BillModelDetailComponent>;
        let service: BillModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [BillModelDetailComponent],
                providers: [
                    BillModelService
                ]
            })
            .overrideTemplate(BillModelDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillModelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillModelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BillModel(123)
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
