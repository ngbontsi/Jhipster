import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CustomerTypeModel } from './customer-type-model.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerTypeModel>;

@Injectable()
export class CustomerTypeModelService {

    private resourceUrl =  SERVER_API_URL + 'api/customer-types';

    constructor(private http: HttpClient) { }

    create(customerType: CustomerTypeModel): Observable<EntityResponseType> {
        const copy = this.convert(customerType);
        return this.http.post<CustomerTypeModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerType: CustomerTypeModel): Observable<EntityResponseType> {
        const copy = this.convert(customerType);
        return this.http.put<CustomerTypeModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerTypeModel>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CustomerTypeModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerTypeModel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerTypeModel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerTypeModel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerTypeModel[]>): HttpResponse<CustomerTypeModel[]> {
        const jsonResponse: CustomerTypeModel[] = res.body;
        const body: CustomerTypeModel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerTypeModel.
     */
    private convertItemFromServer(customerType: CustomerTypeModel): CustomerTypeModel {
        const copy: CustomerTypeModel = Object.assign({}, customerType);
        return copy;
    }

    /**
     * Convert a CustomerTypeModel to a JSON which can be sent to the server.
     */
    private convert(customerType: CustomerTypeModel): CustomerTypeModel {
        const copy: CustomerTypeModel = Object.assign({}, customerType);
        return copy;
    }
}
