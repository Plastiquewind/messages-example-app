import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../shared/models/user-profile';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public constructor(private httpClient: HttpClient) {}

  public getUserProfile(name: string): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(`api/users/${name}`);
  }

  public findUsers(searchText: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`api/users`, {
      params: new HttpParams().set('name', searchText)
    });
  }
}
