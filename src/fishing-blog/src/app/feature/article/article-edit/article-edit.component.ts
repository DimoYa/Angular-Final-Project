import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import ArticleModel from 'src/app/core/models/article-model';
import { ArticleService } from 'src/app/core/services/article.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  article: ArticleModel;
  id: string;
  currentuserId: string;
  currentuserName: string;
  isAdmin: boolean;
  subscription: Subscription = new Subscription();


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.subscription.add(this.route.params.subscribe(data => {
      this.id = data['articleId'];
      this.articleService.getArticleById$(this.id).subscribe((data) => {
        this.article = data;
      })
    }));
    this.currentuserId = this.authenticationService.returnId();
    this.currentuserId = this.authenticationService.returnUserName();
    this.isAdmin = this.authenticationService.isAdmin();
  }

  editArticleForm: FormGroup = this.fb.group({
    headline: new FormControl(null, [
      Validators.required,
      Validators.maxLength(40),
    ]),
    content: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    image: new FormControl(null, [Validators.nullValidator]),
  });

  editArticle() {
    const body: ArticleModel = this.editArticleForm.value;
    body.author = this.article.author;
    body.modified = this.currentuserName;
    console.log(body);

    // this.articleService.editArticle$(body, this.article._id)
    //   .subscribe(() => {
    //     this.router.navigate([`/article/list${this.id}`]);
    //   })
  }
  get f() {
    return this.editArticleForm.controls;
  }

  get invalid() {
    return this.editArticleForm.invalid;
  }
}