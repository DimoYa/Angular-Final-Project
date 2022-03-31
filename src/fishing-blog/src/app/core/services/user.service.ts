import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { appKey } from 'src/app/kinvey.tokens';
import UserModel from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = `https://baas.kinvey.com/user/${appKey}`;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  updateUser(usrModel: UserModel, id: string): Observable<UserModel> {
    return this.http.put<UserModel>(this.baseUrl + `/${id}`, usrModel);
  }

  isCurrentUser(): boolean {
    return `/myProfile/${this.returnId()}` === this.router.url;
  }

  returnId(): string {

    return localStorage.getItem('id');
  }

  returnUserName(): string {

    return localStorage.getItem('username');
  }

  returnUserPhoto(): string {

    return localStorage.getItem('photo');
  }

  getUserData(profileId): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}/${profileId}`);
  }

  getAllUsers() {
    return this.http.get<UserModel[]>(`${this.baseUrl}/`);
  }

  destroy(Id) {
    return this.http.delete(`${this.baseUrl}/${Id}`);
  }
}