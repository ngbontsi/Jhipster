/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomTypeModelDetailComponent } from '../../../../../../main/webapp/app/entities/room-type-model/room-type-model-detail.component';
import { RoomTypeModelService } from '../../../../../../main/webapp/app/entities/room-type-model/room-type-model.service';
import { RoomTypeModel } from '../../../../../../main/webapp/app/entities/room-type-model/room-type-model.model';

describe('Component Tests', () => {

    describe('RoomTypeModel Management Detail Component', () => {
        let comp: RoomTypeModelDetailComponent;
        let fixture: ComponentFixture<RoomTypeModelDetailComponent>;
        let service: RoomTypeModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomTypeModelDetailComponent],
                providers: [
                    RoomTypeModelService
                ]
            })
            .overrideTemplate(RoomTypeModelDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomTypeModelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomTypeModelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RoomTypeModel(123)
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
