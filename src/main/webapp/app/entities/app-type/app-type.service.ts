import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAppType } from 'app/shared/model/app-type.model';

type EntityResponseType = HttpResponse<IAppType>;
type EntityArrayResponseType = HttpResponse<IAppType[]>;

@Injectable({ providedIn: 'root' })
export class AppTypeService {
  public resourceUrl = SERVER_API_URL + 'api/app-types';

  constructor(protected http: HttpClient) {}

  create(appType: IAppType): Observable<EntityResponseType> {
    return this.http.post<IAppType>(this.resourceUrl, appType, { observe: 'response' });
  }

  update(appType: IAppType): Observable<EntityResponseType> {
    return this.http.put<IAppType>(this.resourceUrl, appType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAppType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAppType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
