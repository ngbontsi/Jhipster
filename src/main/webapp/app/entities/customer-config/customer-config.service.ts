import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CustomerConfig } from './customer-config.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerConfig>;

@Injectable()
export class CustomerConfigService {

    private resourceUrl =  SERVER_API_URL + 'api/customers';

    constructor(private http: HttpClient) { }

    create(customer: CustomerConfig): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.post<CustomerConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customer: CustomerConfig): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.put<CustomerConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerConfig>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CustomerConfig[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerConfig[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerConfig[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerConfig[]>): HttpResponse<CustomerConfig[]> {
        const jsonResponse: CustomerConfig[] = res.body;
        const body: CustomerConfig[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerConfig.
     */
    private convertItemFromServer(customer: CustomerConfig): CustomerConfig {
        const copy: CustomerConfig = Object.assign({}, customer);
        return copy;
    }

    /**
     * Convert a CustomerConfig to a JSON which can be sent to the server.
     */
    private convert(customer: CustomerConfig): CustomerConfig {
        const copy: CustomerConfig = Object.assign({}, customer);
        return copy;
    }
}
