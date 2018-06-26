import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RoomServiceConfig } from './room-service-config.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RoomServiceConfig>;

@Injectable()
export class RoomServiceConfigService {

    private resourceUrl =  SERVER_API_URL + 'api/room-services';

    constructor(private http: HttpClient) { }

    create(roomService: RoomServiceConfig): Observable<EntityResponseType> {
        const copy = this.convert(roomService);
        return this.http.post<RoomServiceConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(roomService: RoomServiceConfig): Observable<EntityResponseType> {
        const copy = this.convert(roomService);
        return this.http.put<RoomServiceConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RoomServiceConfig>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RoomServiceConfig[]>> {
        const options = createRequestOption(req);
        return this.http.get<RoomServiceConfig[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RoomServiceConfig[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RoomServiceConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RoomServiceConfig[]>): HttpResponse<RoomServiceConfig[]> {
        const jsonResponse: RoomServiceConfig[] = res.body;
        const body: RoomServiceConfig[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RoomServiceConfig.
     */
    private convertItemFromServer(roomService: RoomServiceConfig): RoomServiceConfig {
        const copy: RoomServiceConfig = Object.assign({}, roomService);
        return copy;
    }

    /**
     * Convert a RoomServiceConfig to a JSON which can be sent to the server.
     */
    private convert(roomService: RoomServiceConfig): RoomServiceConfig {
        const copy: RoomServiceConfig = Object.assign({}, roomService);
        return copy;
    }
}
