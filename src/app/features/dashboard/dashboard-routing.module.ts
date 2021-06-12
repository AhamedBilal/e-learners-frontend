import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
      {path: 'courses', loadChildren: () => import('./courses/courses.module').then(m=> m.CoursesModule)},
      {path: 'reports', loadChildren: () => import('./reports/reports.module').then(m=> m.ReportsModule)},
      {path: 'home', component: HomeComponent},
      {path: '', redirectTo: 'courses', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
