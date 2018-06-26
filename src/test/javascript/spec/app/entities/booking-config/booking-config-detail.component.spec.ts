/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GettingstatedTestModule } from '../../../test.module';
import { BookingConfigDetailComponent } from '../../../../../../main/webapp/app/entities/booking-config/booking-config-detail.component';
import { BookingConfigService } from '../../../../../../main/webapp/app/entities/booking-config/booking-config.service';
import { BookingConfig } from '../../../../../../main/webapp/app/entities/booking-config/booking-config.model';

describe('Component Tests', () => {

    describe('BookingConfig Management Detail Component', () => {
        let comp: BookingConfigDetailComponent;
        let fixture: ComponentFixture<BookingConfigDetailComponent>;
        let service: BookingConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [BookingConfigDetailComponent],
                providers: [
                    BookingConfigService
                ]
            })
            .overrideTemplate(BookingConfigDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookingConfigDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookingConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BookingConfig(123)
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
