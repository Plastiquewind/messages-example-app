import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Message } from '../shared/models/message';
import { MessagesFilter } from './messages-filter';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public constructor(private httpClient: HttpClient) {}

  public get(filter: MessagesFilter): Observable<Message[]> {
    return this.httpClient.get<Message[]>('api/messages', {
      params: this.getHttpParams(filter)
    });
  }

  public post(text: string): Observable<void> {
    return this.httpClient.post<void>('api/messages', {
      message: text
    });
  }

  private getHttpParams(filter: MessagesFilter): HttpParams {
    const paramsObject = Object.keys(filter)
      .filter(key => filter[key] !== null && filter[key] !== undefined)
      .reduce(
        (obj, key) => ({
          ...obj,
          [key]: filter[key].toString()
        }),
        {}
      );

    return new HttpParams({
      fromObject: paramsObject
    });
  }
}
