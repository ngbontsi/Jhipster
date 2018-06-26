/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomTypeConfigDetailComponent } from '../../../../../../main/webapp/app/entities/room-type-config/room-type-config-detail.component';
import { RoomTypeConfigService } from '../../../../../../main/webapp/app/entities/room-type-config/room-type-config.service';
import { RoomTypeConfig } from '../../../../../../main/webapp/app/entities/room-type-config/room-type-config.model';

describe('Component Tests', () => {

    describe('RoomTypeConfig Management Detail Component', () => {
        let comp: RoomTypeConfigDetailComponent;
        let fixture: ComponentFixture<RoomTypeConfigDetailComponent>;
        let service: RoomTypeConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomTypeConfigDetailComponent],
                providers: [
                    RoomTypeConfigService
                ]
            })
            .overrideTemplate(RoomTypeConfigDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomTypeConfigDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomTypeConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RoomTypeConfig(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.roomType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
