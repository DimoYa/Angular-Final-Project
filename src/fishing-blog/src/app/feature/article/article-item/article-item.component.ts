import { Component, Input, OnInit } from '@angular/core';
import ArticleModel from '../../../core/models/article-model';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  @Input('article') article!: ArticleModel;
  constructor() { }

  ngOnInit(): void {
  }

}
