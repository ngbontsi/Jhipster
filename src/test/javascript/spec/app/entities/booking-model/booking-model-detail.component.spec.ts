/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GettingstatedTestModule } from '../../../test.module';
import { BookingModelDetailComponent } from '../../../../../../main/webapp/app/entities/booking-model/booking-model-detail.component';
import { BookingModelService } from '../../../../../../main/webapp/app/entities/booking-model/booking-model.service';
import { BookingModel } from '../../../../../../main/webapp/app/entities/booking-model/booking-model.model';

describe('Component Tests', () => {

    describe('BookingModel Management Detail Component', () => {
        let comp: BookingModelDetailComponent;
        let fixture: ComponentFixture<BookingModelDetailComponent>;
        let service: BookingModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [BookingModelDetailComponent],
                providers: [
                    BookingModelService
                ]
            })
            .overrideTemplate(BookingModelDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookingModelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookingModelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BookingModel(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.booking).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
