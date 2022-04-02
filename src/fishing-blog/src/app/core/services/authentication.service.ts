import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import LoginModel from '../models/login-model';
import UserModel from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly baseUrl = environment.apiUrl;


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

  login$(userModel : LoginModel): Observable<LoginModel> {
    return this.httpClient.post<UserModel>(`${this.baseUrl}/login`, userModel);
  }

  register$(userModel: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${this.baseUrl}`, userModel);
  }

  logout$() : Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/_logout`, {});
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authtoken') !== null;
  }
}
