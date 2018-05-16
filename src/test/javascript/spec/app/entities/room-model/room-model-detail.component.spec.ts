/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomModelDetailComponent } from '../../../../../../main/webapp/app/entities/room-model/room-model-detail.component';
import { RoomModelService } from '../../../../../../main/webapp/app/entities/room-model/room-model.service';
import { RoomModel } from '../../../../../../main/webapp/app/entities/room-model/room-model.model';

describe('Component Tests', () => {

    describe('RoomModel Management Detail Component', () => {
        let comp: RoomModelDetailComponent;
        let fixture: ComponentFixture<RoomModelDetailComponent>;
        let service: RoomModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomModelDetailComponent],
                providers: [
                    RoomModelService
                ]
            })
            .overrideTemplate(RoomModelDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomModelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomModelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RoomModel(123)
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
