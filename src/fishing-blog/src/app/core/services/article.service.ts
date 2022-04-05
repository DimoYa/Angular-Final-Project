import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ArticleModel from '../models/article-model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private httpClient: HttpClient,
    ) { }

  private readonly BASE_URL = `https://baas.kinvey.com/appdata/${appKey}`;
  private readonly ALL_Articles = `${this.BASE_URL}/article?query={}&sort={"_kmd.ect": -1}`;
  private readonly CREATE_POST = `${this.BASE_URL}/article`;

  createArticle(body: Object) {
    return this.httpClient.post(this.CREATE_POST, body);
  }

  getArticles() {
    return this.httpClient.get<ArticleModel[]>(this.ALL_Articles);
  }

  getArticleById(id: string) {
    return this.httpClient.get<ArticleModel>(this.CREATE_POST + `/${id}`);
  }

  getUserArticles() {
    return this.httpClient
      .get<Article[]>(`${this.BASE_URL}/article?query={"author":"${localStorage.getItem('username')}"}&sort={"_kmd.ect": -1}`);
  }

  getArticlesByTitle(title: string) {

    let id = `${this.BASE_URL}/article?query={"headline":"${title}"}&sort={"_kmd.ect": -1}`;
    return this.httpClient
      .get<Article[]>(id);
  }

  deleteArticle(id: string) {
    return this.httpClient.delete(this.CREATE_POST + `/${id}`);
  }

  editArticle(body: Object, id: string) {
    return this.httpClient.put(this.CREATE_POST + `/${id}`, body);
  }
}