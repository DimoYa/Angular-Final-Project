import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBoxInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { Subscription } from 'rxjs';
import ArticleModel from 'src/app/core/models/article-model';
import { ArticleService } from 'src/app/core/services/article.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  article: ArticleModel;

  subscription: Subscription = new Subscription();
  id: string;
  currentuserName: string;
  isAdmin: boolean;

  constructor(
    private articleService: ArticleService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  private readonly confirmMsg =
    'Are you sure that you want to delete the article?';

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe((data) => {
        this.id = data['articleId'];
        this.articleService.getArticleById$(this.id).subscribe((data) => {
          this.article = data;
        });
      })
    );
    this.currentuserName = this.authenticationService.returnUserName();
    this.isAdmin = this.authenticationService.isAdmin();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  canModify(article: ArticleModel): boolean {
    return article.author === this.currentuserName || this.isAdmin;
  }

  deleteArticle(id: string): void {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle(this.confirmMsg);
    confirmBox.setButtonLabels('YES', 'NO');

    if (this.canModify(this.article)) {
      this.subscription.add(
        confirmBox.openConfirmBox$().subscribe((resp) => {
          if (resp.success) {
            this.subscription.add(
              this.articleService.deleteArticle$(id).subscribe(() => {
                this.router.navigate(['/article/list']);
              })
            );
          }
        })
      );
    }
  }

  loadComments() :void {
    
  }
}
