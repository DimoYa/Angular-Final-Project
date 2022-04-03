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

  constructor(private httpClient: HttpClient) { }

  updateUser$(usrModel: UserModel, id: string): Observable<UserModel> {
    return this.httpClient.put<UserModel>(`${this.baseUrl}/${id}`, usrModel);
  }

  deleteUser$(id: string) : Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
  
  getUser$(profileId: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.baseUrl}/${profileId}`);
  }

  getAllUsers$() : Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(`${this.baseUrl}/`);
  }
}