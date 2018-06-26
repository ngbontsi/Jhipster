import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CustomerTypeConfig } from './customer-type-config.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerTypeConfig>;

@Injectable()
export class CustomerTypeConfigService {

    private resourceUrl =  SERVER_API_URL + 'api/customer-types';

    constructor(private http: HttpClient) { }

    create(customerType: CustomerTypeConfig): Observable<EntityResponseType> {
        const copy = this.convert(customerType);
        return this.http.post<CustomerTypeConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerType: CustomerTypeConfig): Observable<EntityResponseType> {
        const copy = this.convert(customerType);
        return this.http.put<CustomerTypeConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerTypeConfig>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CustomerTypeConfig[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerTypeConfig[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerTypeConfig[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerTypeConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerTypeConfig[]>): HttpResponse<CustomerTypeConfig[]> {
        const jsonResponse: CustomerTypeConfig[] = res.body;
        const body: CustomerTypeConfig[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerTypeConfig.
     */
    private convertItemFromServer(customerType: CustomerTypeConfig): CustomerTypeConfig {
        const copy: CustomerTypeConfig = Object.assign({}, customerType);
        return copy;
    }

    /**
     * Convert a CustomerTypeConfig to a JSON which can be sent to the server.
     */
    private convert(customerType: CustomerTypeConfig): CustomerTypeConfig {
        const copy: CustomerTypeConfig = Object.assign({}, customerType);
        return copy;
    }
}
