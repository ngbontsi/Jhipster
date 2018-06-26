/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomServiceConfigComponent } from '../../../../../../main/webapp/app/entities/room-service-config/room-service-config.component';
import { RoomServiceConfigService } from '../../../../../../main/webapp/app/entities/room-service-config/room-service-config.service';
import { RoomServiceConfig } from '../../../../../../main/webapp/app/entities/room-service-config/room-service-config.model';

describe('Component Tests', () => {

    describe('RoomServiceConfig Management Component', () => {
        let comp: RoomServiceConfigComponent;
        let fixture: ComponentFixture<RoomServiceConfigComponent>;
        let service: RoomServiceConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomServiceConfigComponent],
                providers: [
                    RoomServiceConfigService
                ]
            })
            .overrideTemplate(RoomServiceConfigComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomServiceConfigComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomServiceConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RoomServiceConfig(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.roomServices[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
