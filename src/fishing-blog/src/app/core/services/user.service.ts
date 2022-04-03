import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import UserModel from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  updateUser$(usrModel: UserModel, id: string): Observable<UserModel> {
    return this.http.put<UserModel>(this.baseUrl + `/${id}`, usrModel);
  }
  
  getUserData$(profileId: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}/${profileId}`);
  }

  getAllUsers$() : Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}/`);
  }

  destroy$(Id: string) : Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${Id}`);
  }
}