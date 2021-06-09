import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LearningComponent} from "./learning/learning.component";
import {CommonViewComponent} from "./common-view/common-view.component";
import {CourseComponent} from "./course/course.component";

const routes: Routes = [
  {path: '', component: LearningComponent, children: [
      {path: 'ongoing', component: CommonViewComponent},
      {path: 'complete', component: CommonViewComponent},
      {path: 'wishlist', component: CommonViewComponent},
      {path: '', redirectTo: 'ongoing', pathMatch: 'full'}
    ]
  },
  {path: 'course/:id', component: CourseComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule { }
