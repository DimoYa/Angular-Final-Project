import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import ArticleModel from 'src/app/core/models/article-model';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-article-mine',
  templateUrl: './article-mine.component.html',
  styleUrls: ['./article-mine.component.css'],
})
export class ArticleMineComponent implements OnInit {
  myArticles$: Observable<ArticleModel[]>;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.myArticles$ = this.articleService.getUserArticles$();
  }
}
