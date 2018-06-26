/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GettingstatedTestModule } from '../../../test.module';
import { BookingConfigComponent } from '../../../../../../main/webapp/app/entities/booking-config/booking-config.component';
import { BookingConfigService } from '../../../../../../main/webapp/app/entities/booking-config/booking-config.service';
import { BookingConfig } from '../../../../../../main/webapp/app/entities/booking-config/booking-config.model';

describe('Component Tests', () => {

    describe('BookingConfig Management Component', () => {
        let comp: BookingConfigComponent;
        let fixture: ComponentFixture<BookingConfigComponent>;
        let service: BookingConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [BookingConfigComponent],
                providers: [
                    BookingConfigService
                ]
            })
            .overrideTemplate(BookingConfigComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookingConfigComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookingConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BookingConfig(123)],
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
