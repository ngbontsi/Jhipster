import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RoomModel } from './room-model.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RoomModel>;

@Injectable()
export class RoomModelService {

    private resourceUrl =  SERVER_API_URL + 'api/rooms';

    constructor(private http: HttpClient) { }

    create(room: RoomModel): Observable<EntityResponseType> {
        const copy = this.convert(room);
        return this.http.post<RoomModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(room: RoomModel): Observable<EntityResponseType> {
        const copy = this.convert(room);
        return this.http.put<RoomModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RoomModel>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RoomModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<RoomModel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RoomModel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RoomModel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RoomModel[]>): HttpResponse<RoomModel[]> {
        const jsonResponse: RoomModel[] = res.body;
        const body: RoomModel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RoomModel.
     */
    private convertItemFromServer(room: RoomModel): RoomModel {
        const copy: RoomModel = Object.assign({}, room);
        return copy;
    }

    /**
     * Convert a RoomModel to a JSON which can be sent to the server.
     */
    private convert(room: RoomModel): RoomModel {
        const copy: RoomModel = Object.assign({}, room);
        return copy;
    }
}
