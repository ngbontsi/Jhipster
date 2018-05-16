/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GettingstatedTestModule } from '../../../test.module';
import { RoomServiceModelComponent } from '../../../../../../main/webapp/app/entities/room-service-model/room-service-model.component';
import { RoomServiceModelService } from '../../../../../../main/webapp/app/entities/room-service-model/room-service-model.service';
import { RoomServiceModel } from '../../../../../../main/webapp/app/entities/room-service-model/room-service-model.model';

describe('Component Tests', () => {

    describe('RoomServiceModel Management Component', () => {
        let comp: RoomServiceModelComponent;
        let fixture: ComponentFixture<RoomServiceModelComponent>;
        let service: RoomServiceModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GettingstatedTestModule],
                declarations: [RoomServiceModelComponent],
                providers: [
                    RoomServiceModelService
                ]
            })
            .overrideTemplate(RoomServiceModelComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomServiceModelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomServiceModelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RoomServiceModel(123)],
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
