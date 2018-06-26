/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomTypeConfigComponent } from '../../../../../../main/webapp/app/entities/room-type-config/room-type-config.component';
import { RoomTypeConfigService } from '../../../../../../main/webapp/app/entities/room-type-config/room-type-config.service';
import { RoomTypeConfig } from '../../../../../../main/webapp/app/entities/room-type-config/room-type-config.model';

describe('Component Tests', () => {

    describe('RoomTypeConfig Management Component', () => {
        let comp: RoomTypeConfigComponent;
        let fixture: ComponentFixture<RoomTypeConfigComponent>;
        let service: RoomTypeConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomTypeConfigComponent],
                providers: [
                    RoomTypeConfigService
                ]
            })
            .overrideTemplate(RoomTypeConfigComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomTypeConfigComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomTypeConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RoomTypeConfig(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.roomTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
