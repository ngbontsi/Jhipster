/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomServiceConfigDetailComponent } from '../../../../../../main/webapp/app/entities/room-service-config/room-service-config-detail.component';
import { RoomServiceConfigService } from '../../../../../../main/webapp/app/entities/room-service-config/room-service-config.service';
import { RoomServiceConfig } from '../../../../../../main/webapp/app/entities/room-service-config/room-service-config.model';

describe('Component Tests', () => {

    describe('RoomServiceConfig Management Detail Component', () => {
        let comp: RoomServiceConfigDetailComponent;
        let fixture: ComponentFixture<RoomServiceConfigDetailComponent>;
        let service: RoomServiceConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomServiceConfigDetailComponent],
                providers: [
                    RoomServiceConfigService
                ]
            })
            .overrideTemplate(RoomServiceConfigDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomServiceConfigDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomServiceConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RoomServiceConfig(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.roomService).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
