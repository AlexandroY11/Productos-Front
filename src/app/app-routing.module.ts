import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { CategoryFormComponent } from './components/categories/category-form/category-form.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { AuthGuard } from './admin/guards/auth.guard';
import { LoginComponent } from './admin/components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategoryListComponent, canActivate: [AuthGuard] },
  { path: 'categories/create', component: CategoryFormComponent, canActivate: [AuthGuard] },
  { path: 'categories/edit/:id', component: CategoryFormComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'products/create', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: 'products/edit/:id', component: ProductFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
