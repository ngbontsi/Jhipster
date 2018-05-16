import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BillModel } from './bill-model.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BillModel>;

@Injectable()
export class BillModelService {

    private resourceUrl =  SERVER_API_URL + 'api/bills';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(bill: BillModel): Observable<EntityResponseType> {
        const copy = this.convert(bill);
        return this.http.post<BillModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bill: BillModel): Observable<EntityResponseType> {
        const copy = this.convert(bill);
        return this.http.put<BillModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BillModel>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BillModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<BillModel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BillModel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BillModel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BillModel[]>): HttpResponse<BillModel[]> {
        const jsonResponse: BillModel[] = res.body;
        const body: BillModel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BillModel.
     */
    private convertItemFromServer(bill: BillModel): BillModel {
        const copy: BillModel = Object.assign({}, bill);
        copy.paydate = this.dateUtils
            .convertDateTimeFromServer(bill.paydate);
        return copy;
    }

    /**
     * Convert a BillModel to a JSON which can be sent to the server.
     */
    private convert(bill: BillModel): BillModel {
        const copy: BillModel = Object.assign({}, bill);

        copy.paydate = this.dateUtils.toDate(bill.paydate);
        return copy;
    }
}
