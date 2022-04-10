import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ArticleModel from '../../../core/models/article-model';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css'],
})
export class ArticleItemComponent implements OnInit {
  detailsBtnName!: string;

  @Input('article') article!: ArticleModel;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.detailsBtnName =
      this.route.snapshot.url[0].path === 'list'
        ? 'Continue reading'
        : 'Details';
  }
}
