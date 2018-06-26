/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomConfigDetailComponent } from '../../../../../../main/webapp/app/entities/room-config/room-config-detail.component';
import { RoomConfigService } from '../../../../../../main/webapp/app/entities/room-config/room-config.service';
import { RoomConfig } from '../../../../../../main/webapp/app/entities/room-config/room-config.model';

describe('Component Tests', () => {

    describe('RoomConfig Management Detail Component', () => {
        let comp: RoomConfigDetailComponent;
        let fixture: ComponentFixture<RoomConfigDetailComponent>;
        let service: RoomConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomConfigDetailComponent],
                providers: [
                    RoomConfigService
                ]
            })
            .overrideTemplate(RoomConfigDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomConfigDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RoomConfig(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.room).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
