import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BookingModel } from './booking-model.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BookingModel>;

@Injectable()
export class BookingModelService {

    private resourceUrl =  SERVER_API_URL + 'api/bookings';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(booking: BookingModel): Observable<EntityResponseType> {
        const copy = this.convert(booking);
        return this.http.post<BookingModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(booking: BookingModel): Observable<EntityResponseType> {
        const copy = this.convert(booking);
        return this.http.put<BookingModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BookingModel>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BookingModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<BookingModel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BookingModel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BookingModel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BookingModel[]>): HttpResponse<BookingModel[]> {
        const jsonResponse: BookingModel[] = res.body;
        const body: BookingModel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BookingModel.
     */
    private convertItemFromServer(booking: BookingModel): BookingModel {
        const copy: BookingModel = Object.assign({}, booking);
        copy.datein = this.dateUtils
            .convertDateTimeFromServer(booking.datein);
        copy.dateout = this.dateUtils
            .convertDateTimeFromServer(booking.dateout);
        return copy;
    }

    /**
     * Convert a BookingModel to a JSON which can be sent to the server.
     */
    private convert(booking: BookingModel): BookingModel {
        const copy: BookingModel = Object.assign({}, booking);

        copy.datein = this.dateUtils.toDate(booking.datein);

        copy.dateout = this.dateUtils.toDate(booking.dateout);
        return copy;
    }
}
