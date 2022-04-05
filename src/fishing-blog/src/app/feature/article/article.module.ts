import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from 'src/app/core/services/article.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ArticleService,
  ],
})
export class ArticleModule { }
