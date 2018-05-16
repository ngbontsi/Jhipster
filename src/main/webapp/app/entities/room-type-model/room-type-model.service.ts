import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RoomTypeModel } from './room-type-model.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RoomTypeModel>;

@Injectable()
export class RoomTypeModelService {

    private resourceUrl =  SERVER_API_URL + 'api/room-types';

    constructor(private http: HttpClient) { }

    create(roomType: RoomTypeModel): Observable<EntityResponseType> {
        const copy = this.convert(roomType);
        return this.http.post<RoomTypeModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(roomType: RoomTypeModel): Observable<EntityResponseType> {
        const copy = this.convert(roomType);
        return this.http.put<RoomTypeModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RoomTypeModel>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RoomTypeModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<RoomTypeModel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RoomTypeModel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RoomTypeModel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RoomTypeModel[]>): HttpResponse<RoomTypeModel[]> {
        const jsonResponse: RoomTypeModel[] = res.body;
        const body: RoomTypeModel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RoomTypeModel.
     */
    private convertItemFromServer(roomType: RoomTypeModel): RoomTypeModel {
        const copy: RoomTypeModel = Object.assign({}, roomType);
        return copy;
    }

    /**
     * Convert a RoomTypeModel to a JSON which can be sent to the server.
     */
    private convert(roomType: RoomTypeModel): RoomTypeModel {
        const copy: RoomTypeModel = Object.assign({}, roomType);
        return copy;
    }
}
