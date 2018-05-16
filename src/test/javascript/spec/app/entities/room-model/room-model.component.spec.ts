/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomModelComponent } from '../../../../../../main/webapp/app/entities/room-model/room-model.component';
import { RoomModelService } from '../../../../../../main/webapp/app/entities/room-model/room-model.service';
import { RoomModel } from '../../../../../../main/webapp/app/entities/room-model/room-model.model';

describe('Component Tests', () => {

    describe('RoomModel Management Component', () => {
        let comp: RoomModelComponent;
        let fixture: ComponentFixture<RoomModelComponent>;
        let service: RoomModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomModelComponent],
                providers: [
                    RoomModelService
                ]
            })
            .overrideTemplate(RoomModelComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomModelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomModelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RoomModel(123)],
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
