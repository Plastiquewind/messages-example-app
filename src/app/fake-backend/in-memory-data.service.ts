import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo
} from 'angular-in-memory-web-api/interfaces';
import { Message } from '../shared/models/message';
import { STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { UserProfile } from '../shared/models/user-profile';
import { User } from '../shared/models/user';
import { FakeUserTokens } from './fake-user-tokens';
import * as m from 'moment';
import { messages, users, userProfiles } from './fake-data';

const moment = m;

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  public createDb(): {
    messages: Message[];
    users: User[];
    userProfiles: UserProfile[];
  } {
    return {
      messages: [...messages],
      users: [...users],
      userProfiles: [...userProfiles]
    };
  }

  public get(reqInfo: RequestInfo): Observable<any> {
    if (reqInfo.url.includes('/users/') && reqInfo.query.size === 0) {
      return this.getUserProfile(reqInfo);
    }

    switch (reqInfo.collectionName) {
      case 'messages':
        return this.getMessages(reqInfo);
    }

    return undefined;
  }

  public post(reqInfo: RequestInfo): Observable<any> {
    switch (reqInfo.collectionName) {
      case 'messages':
        return this.postMessage(reqInfo);
    }

    return undefined;
  }

  private getMessages(reqInfo: RequestInfo): Observable<any> {
    const params = reqInfo.query;
    const offset = Number(params.get('offset')[0]);
    const count = Number(params.get('count')[0]);
    const text = params.has('text')
      ? params.get('text')[0].toLowerCase()
      : null;
    const author = params.has('author')
      ? Number(params.get('author')[0])
      : null;
    const from = params.has('from')
      ? moment(new Date(params.get('from')[0]))
      : null;
    const to = params.has('to')
      ? moment(new Date(params.get('to')[0])).add(1, 'day')
      : null;
    const allMessages = (reqInfo.collection as Message[]).sort(
      (a, b) => moment(b.created).valueOf() - moment(a.created).valueOf()
    );

    let result: Message[];

    result = text
      ? allMessages.filter(message => message.text.toLowerCase().includes(text))
      : allMessages;
    result = author
      ? result.filter(message => message.author.id === author)
      : result;
    result = from
      ? result.filter(message => moment(message.created) >= from)
      : result;
    result = to
      ? result.filter(message => moment(message.created) <= to)
      : result;
    result = result.slice(offset, offset + count);

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK,
      body: result
    }));
  }

  private postMessage(reqInfo: RequestInfo): Observable<any> {
    const token = ((reqInfo.req as any).headers.lazyUpdate[0]
      .value as string).split(' ')[1];
    const userName = FakeUserTokens.getLogin(token);
    const user = users.find(u => u.name === userName);
    const allMessages = reqInfo.collection as Message[];

    allMessages.unshift({
      id: allMessages.length + 1,
      author: user,
      text: (reqInfo.req as any).body.message,
      created:
        moment()
          .utc()
          .format('YYYY-MM-DD HH:mm:ss')
          .replace(' ', 'T') + 'Z'
    });

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK
    }));
  }

  private getUserProfile(reqInfo: RequestInfo): Observable<any> {
    const username = reqInfo.url
      .slice(reqInfo.url.lastIndexOf('/') + 1)
      .toLowerCase();
    const result = userProfiles.find(
      user => user.name.toLowerCase() === username
    );

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK,
      body: result
    }));
  }
}
