import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RoomServiceModel } from './room-service-model.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RoomServiceModel>;

@Injectable()
export class RoomServiceModelService {

    private resourceUrl =  SERVER_API_URL + 'api/room-services';

    constructor(private http: HttpClient) { }

    create(roomService: RoomServiceModel): Observable<EntityResponseType> {
        const copy = this.convert(roomService);
        return this.http.post<RoomServiceModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(roomService: RoomServiceModel): Observable<EntityResponseType> {
        const copy = this.convert(roomService);
        return this.http.put<RoomServiceModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RoomServiceModel>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RoomServiceModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<RoomServiceModel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RoomServiceModel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RoomServiceModel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RoomServiceModel[]>): HttpResponse<RoomServiceModel[]> {
        const jsonResponse: RoomServiceModel[] = res.body;
        const body: RoomServiceModel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RoomServiceModel.
     */
    private convertItemFromServer(roomService: RoomServiceModel): RoomServiceModel {
        const copy: RoomServiceModel = Object.assign({}, roomService);
        return copy;
    }

    /**
     * Convert a RoomServiceModel to a JSON which can be sent to the server.
     */
    private convert(roomService: RoomServiceModel): RoomServiceModel {
        const copy: RoomServiceModel = Object.assign({}, roomService);
        return copy;
    }
}
