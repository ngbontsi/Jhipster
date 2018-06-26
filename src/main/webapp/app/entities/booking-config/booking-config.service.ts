import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BookingConfig } from './booking-config.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BookingConfig>;

@Injectable()
export class BookingConfigService {

    private resourceUrl =  SERVER_API_URL + 'api/bookings';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(booking: BookingConfig): Observable<EntityResponseType> {
        const copy = this.convert(booking);
        return this.http.post<BookingConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(booking: BookingConfig): Observable<EntityResponseType> {
        const copy = this.convert(booking);
        return this.http.put<BookingConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BookingConfig>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BookingConfig[]>> {
        const options = createRequestOption(req);
        return this.http.get<BookingConfig[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BookingConfig[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BookingConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BookingConfig[]>): HttpResponse<BookingConfig[]> {
        const jsonResponse: BookingConfig[] = res.body;
        const body: BookingConfig[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BookingConfig.
     */
    private convertItemFromServer(booking: BookingConfig): BookingConfig {
        const copy: BookingConfig = Object.assign({}, booking);
        copy.datein = this.dateUtils
            .convertDateTimeFromServer(booking.datein);
        copy.dateout = this.dateUtils
            .convertDateTimeFromServer(booking.dateout);
        return copy;
    }

    /**
     * Convert a BookingConfig to a JSON which can be sent to the server.
     */
    private convert(booking: BookingConfig): BookingConfig {
        const copy: BookingConfig = Object.assign({}, booking);

        copy.datein = this.dateUtils.toDate(booking.datein);

        copy.dateout = this.dateUtils.toDate(booking.dateout);
        return copy;
    }
}
