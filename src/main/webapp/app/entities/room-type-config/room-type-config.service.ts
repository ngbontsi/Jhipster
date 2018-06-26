import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RoomTypeConfig } from './room-type-config.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RoomTypeConfig>;

@Injectable()
export class RoomTypeConfigService {

    private resourceUrl =  SERVER_API_URL + 'api/room-types';

    constructor(private http: HttpClient) { }

    create(roomType: RoomTypeConfig): Observable<EntityResponseType> {
        const copy = this.convert(roomType);
        return this.http.post<RoomTypeConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(roomType: RoomTypeConfig): Observable<EntityResponseType> {
        const copy = this.convert(roomType);
        return this.http.put<RoomTypeConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RoomTypeConfig>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RoomTypeConfig[]>> {
        const options = createRequestOption(req);
        return this.http.get<RoomTypeConfig[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RoomTypeConfig[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RoomTypeConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RoomTypeConfig[]>): HttpResponse<RoomTypeConfig[]> {
        const jsonResponse: RoomTypeConfig[] = res.body;
        const body: RoomTypeConfig[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RoomTypeConfig.
     */
    private convertItemFromServer(roomType: RoomTypeConfig): RoomTypeConfig {
        const copy: RoomTypeConfig = Object.assign({}, roomType);
        return copy;
    }

    /**
     * Convert a RoomTypeConfig to a JSON which can be sent to the server.
     */
    private convert(roomType: RoomTypeConfig): RoomTypeConfig {
        const copy: RoomTypeConfig = Object.assign({}, roomType);
        return copy;
    }
}
