import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../../core/guard/user.guard';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleListComponent } from './article-list/article-list.component';

const routes: Routes = [
  { path: 'create', canActivate: [UserGuard], component: ArticleCreateComponent },
  { path: 'list', canActivate: [UserGuard], component: ArticleListComponent },
  { path: 'list/:articleId', canActivate: [UserGuard], component: ArticleDetailsComponent },
];

export const ArticleRoutingModule = RouterModule.forChild(routes);