import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RoomConfig } from './room-config.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RoomConfig>;

@Injectable()
export class RoomConfigService {

    private resourceUrl =  SERVER_API_URL + 'api/rooms';

    constructor(private http: HttpClient) { }

    create(room: RoomConfig): Observable<EntityResponseType> {
        const copy = this.convert(room);
        return this.http.post<RoomConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(room: RoomConfig): Observable<EntityResponseType> {
        const copy = this.convert(room);
        return this.http.put<RoomConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RoomConfig>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RoomConfig[]>> {
        const options = createRequestOption(req);
        return this.http.get<RoomConfig[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RoomConfig[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RoomConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RoomConfig[]>): HttpResponse<RoomConfig[]> {
        const jsonResponse: RoomConfig[] = res.body;
        const body: RoomConfig[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RoomConfig.
     */
    private convertItemFromServer(room: RoomConfig): RoomConfig {
        const copy: RoomConfig = Object.assign({}, room);
        return copy;
    }

    /**
     * Convert a RoomConfig to a JSON which can be sent to the server.
     */
    private convert(room: RoomConfig): RoomConfig {
        const copy: RoomConfig = Object.assign({}, room);
        return copy;
    }
}
