import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appKey } from 'src/app/kinvey.tokens';
import UserModel from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly baseUrl = `https://baas.kinvey.com/user/${appKey}`;

  currentAuthtoken: string;
  
  constructor(
    private httpClient: HttpClient
  ) { }

  get authtoken() {
    return this.currentAuthtoken;
  }

  set authtoken(value: string) {
    this.currentAuthtoken = value;
  }

  login(userModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${this.baseUrl}/login`, userModel);
  }

  register(userModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${this.baseUrl}`, userModel);
  }

  logout() {
    return this.httpClient.post(`${this.baseUrl}/_logout`, {});
  }

  isLoggedIn() {
    return localStorage.getItem('authtoken') !== null;
  }
}
