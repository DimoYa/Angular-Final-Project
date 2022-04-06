import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../core/services/article.service';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleRoutingModule } from './article-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleItemComponent } from './article-item/article-item.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';



@NgModule({
  declarations: [
    ArticleCreateComponent,
    ArticleItemComponent,
    ArticleListComponent,
    ArticleDetailsComponent,
    ArticleEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ArticleRoutingModule
  ],
  providers: [
    ArticleService,
  ],
})
export class ArticleModule { }
