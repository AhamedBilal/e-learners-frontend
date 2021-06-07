import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
  {path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)},
  {path: 'cart', loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule)},
  {path: 'settings', loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule)},
  {path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'teacher', loadChildren: () => import('./features/teach/teach.module').then(m => m.TeachModule)},
  {path: 'course/:id', loadChildren: () => import('./features/course/course.module').then(m => m.CourseModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
