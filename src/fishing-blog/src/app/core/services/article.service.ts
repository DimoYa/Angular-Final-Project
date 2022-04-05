import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import ArticleModel from '../models/article-model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  private readonly baseUrl = environment.apiAppUrl;
  private readonly articleEndPoint = `${this.baseUrl}/article`;

  createArticle$(body: ArticleModel): Observable<ArticleModel> {
    return this.httpClient.post<ArticleModel>(this.articleEndPoint, body);
  }

  getArticles$(): Observable<ArticleModel[]> {
    return this.httpClient.get<ArticleModel[]>(
      `${this.articleEndPoint}?query={}&sort={"_kmd.ect": -1}`
    );
  }

  getArticleById$(id: string): Observable<ArticleModel> {
    return this.httpClient.get<ArticleModel>(
      `${this.articleEndPoint}?query={}&sort={"_kmd.ect": -1}'}/${id}`
    );
  }

  getUserArticles$(): Observable<ArticleModel[]> {
    const currentUser = this.authenticationService.returnUserName();
    return this.httpClient.get<ArticleModel[]>(
      `${this.baseUrl}/article?query={"author":"${currentUser}"}&sort={"_kmd.ect": -1}`
    );
  }

  getArticlesByTitle$(title: string): Observable<ArticleModel[]> {
    return this.httpClient.get<ArticleModel[]>(
      `${this.baseUrl}/article?query={"headline":"${title}"}&sort={"_kmd.ect": -1}`
    );
  }

  deleteArticle$(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.articleEndPoint}/${id}`);
  }

  editArticle$(body: Object, id: string) {
    return this.httpClient.put(`${this.articleEndPoint}/${id}`, body);
  }
}
