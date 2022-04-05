import { RouterModule, Routes } from "@angular/router";
import { UserGuard } from "src/app/core/guard/user.guard";
import { ArticleCreateComponent } from "./article-create/article-create.component";

const routes: Routes = [
    { path: 'article/create',canActivate: [UserGuard], component: ArticleCreateComponent },
  ];
  
  export const ArticleRoutingModule = RouterModule.forChild(routes);