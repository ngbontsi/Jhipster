import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BillConfig } from './bill-config.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BillConfig>;

@Injectable()
export class BillConfigService {

    private resourceUrl =  SERVER_API_URL + 'api/bills';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(bill: BillConfig): Observable<EntityResponseType> {
        const copy = this.convert(bill);
        return this.http.post<BillConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bill: BillConfig): Observable<EntityResponseType> {
        const copy = this.convert(bill);
        return this.http.put<BillConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BillConfig>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BillConfig[]>> {
        const options = createRequestOption(req);
        return this.http.get<BillConfig[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BillConfig[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BillConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BillConfig[]>): HttpResponse<BillConfig[]> {
        const jsonResponse: BillConfig[] = res.body;
        const body: BillConfig[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BillConfig.
     */
    private convertItemFromServer(bill: BillConfig): BillConfig {
        const copy: BillConfig = Object.assign({}, bill);
        copy.paydate = this.dateUtils
            .convertDateTimeFromServer(bill.paydate);
        return copy;
    }

    /**
     * Convert a BillConfig to a JSON which can be sent to the server.
     */
    private convert(bill: BillConfig): BillConfig {
        const copy: BillConfig = Object.assign({}, bill);

        copy.paydate = this.dateUtils.toDate(bill.paydate);
        return copy;
    }
}
