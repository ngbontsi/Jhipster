/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GettingstatedTestModule } from '../../../test.module';
import { BookingModelComponent } from '../../../../../../main/webapp/app/entities/booking-model/booking-model.component';
import { BookingModelService } from '../../../../../../main/webapp/app/entities/booking-model/booking-model.service';
import { BookingModel } from '../../../../../../main/webapp/app/entities/booking-model/booking-model.model';

describe('Component Tests', () => {

    describe('BookingModel Management Component', () => {
        let comp: BookingModelComponent;
        let fixture: ComponentFixture<BookingModelComponent>;
        let service: BookingModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [BookingModelComponent],
                providers: [
                    BookingModelService
                ]
            })
            .overrideTemplate(BookingModelComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookingModelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookingModelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BookingModel(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bookings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
