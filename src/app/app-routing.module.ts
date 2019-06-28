import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeModule } from './recipes/recipe.module';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full'}
  // { path: 'recipes', loadChildren: './recipes/recipe.module#RecipeModule' },
  // {
  //   path: 'shopping-list',
  //   loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
  // },
  // {
  //   path: 'auth',
  //   loadChildren: './auth/auth.module#AuthModule'
  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
