import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CustomerModel } from './customer-model.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerModel>;

@Injectable()
export class CustomerModelService {

    private resourceUrl =  SERVER_API_URL + 'api/customers';

    constructor(private http: HttpClient) { }

    create(customer: CustomerModel): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.post<CustomerModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customer: CustomerModel): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.put<CustomerModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerModel>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CustomerModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerModel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerModel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerModel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerModel[]>): HttpResponse<CustomerModel[]> {
        const jsonResponse: CustomerModel[] = res.body;
        const body: CustomerModel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerModel.
     */
    private convertItemFromServer(customer: CustomerModel): CustomerModel {
        const copy: CustomerModel = Object.assign({}, customer);
        return copy;
    }

    /**
     * Convert a CustomerModel to a JSON which can be sent to the server.
     */
    private convert(customer: CustomerModel): CustomerModel {
        const copy: CustomerModel = Object.assign({}, customer);
        return copy;
    }
}
