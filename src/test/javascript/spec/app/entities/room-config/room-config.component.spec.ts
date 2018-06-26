/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomConfigComponent } from '../../../../../../main/webapp/app/entities/room-config/room-config.component';
import { RoomConfigService } from '../../../../../../main/webapp/app/entities/room-config/room-config.service';
import { RoomConfig } from '../../../../../../main/webapp/app/entities/room-config/room-config.model';

describe('Component Tests', () => {

    describe('RoomConfig Management Component', () => {
        let comp: RoomConfigComponent;
        let fixture: ComponentFixture<RoomConfigComponent>;
        let service: RoomConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomConfigComponent],
                providers: [
                    RoomConfigService
                ]
            })
            .overrideTemplate(RoomConfigComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomConfigComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RoomConfig(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rooms[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
