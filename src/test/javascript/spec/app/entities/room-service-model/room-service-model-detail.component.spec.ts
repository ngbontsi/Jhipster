/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomServiceModelDetailComponent } from '../../../../../../main/webapp/app/entities/room-service-model/room-service-model-detail.component';
import { RoomServiceModelService } from '../../../../../../main/webapp/app/entities/room-service-model/room-service-model.service';
import { RoomServiceModel } from '../../../../../../main/webapp/app/entities/room-service-model/room-service-model.model';

describe('Component Tests', () => {

    describe('RoomServiceModel Management Detail Component', () => {
        let comp: RoomServiceModelDetailComponent;
        let fixture: ComponentFixture<RoomServiceModelDetailComponent>;
        let service: RoomServiceModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomServiceModelDetailComponent],
                providers: [
                    RoomServiceModelService
                ]
            })
            .overrideTemplate(RoomServiceModelDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomServiceModelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomServiceModelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RoomServiceModel(123)
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
