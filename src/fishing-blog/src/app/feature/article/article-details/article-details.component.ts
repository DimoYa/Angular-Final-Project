import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import ArticleModel from 'src/app/core/models/article-model';
import { ArticleService } from 'src/app/core/services/article.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {

  @Input('article') article: ArticleModel;

  subscription: Subscription = new Subscription();
  id: string;
  currentuserId: string;
  isAdmin: boolean;

  constructor(
    private articleService: ArticleService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription.add(this.route.params.subscribe(data => {
      this.id = data['articleId'];
      this.articleService.getArticleById$(this.id).subscribe((data) => {
        this.article = data;
      })
    }));
    this.currentuserId = this.authenticationService.returnId();
    this.isAdmin = this.authenticationService.isAdmin();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  canModify(article: ArticleModel) {
    return article._acl['creator'] === this.currentuserId || this.isAdmin;
  }

  deleteArticle(id: string) {
    this.subscription.add(this.articleService.deleteArticle$(id)
      .subscribe(() => {
        this.router.navigate(['/article/list']);
      }));
  }
}