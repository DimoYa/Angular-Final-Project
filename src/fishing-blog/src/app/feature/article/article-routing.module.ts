import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../../core/guard/user.guard';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleListComponent } from './article-list/article-list.component';

const routes: Routes = [
  { path: 'create', canActivate: [UserGuard], component: ArticleCreateComponent },
  { path: 'article-list', canActivate: [UserGuard], component: ArticleListComponent },
];

export const ArticleRoutingModule = RouterModule.forChild(routes);