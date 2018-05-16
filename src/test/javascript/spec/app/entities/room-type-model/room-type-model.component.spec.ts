/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomTypeModelComponent } from '../../../../../../main/webapp/app/entities/room-type-model/room-type-model.component';
import { RoomTypeModelService } from '../../../../../../main/webapp/app/entities/room-type-model/room-type-model.service';
import { RoomTypeModel } from '../../../../../../main/webapp/app/entities/room-type-model/room-type-model.model';

describe('Component Tests', () => {

    describe('RoomTypeModel Management Component', () => {
        let comp: RoomTypeModelComponent;
        let fixture: ComponentFixture<RoomTypeModelComponent>;
        let service: RoomTypeModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomTypeModelComponent],
                providers: [
                    RoomTypeModelService
                ]
            })
            .overrideTemplate(RoomTypeModelComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomTypeModelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomTypeModelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RoomTypeModel(123)],
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
