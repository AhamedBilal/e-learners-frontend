import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
      {path: 'courses', loadChildren: () => import('./courses/courses.module').then(m=> m.CoursesModule)},
      {path: 'reports', loadChildren: () => import('./reports/reports.module').then(m=> m.ReportsModule)},
      // {path: 'courses', loadChildren: () => import('./courses/courses.module').then(m=> m.CoursesModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
