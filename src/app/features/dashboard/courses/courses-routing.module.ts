import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesComponent} from "./courses/courses.component";
import {CreateCourseComponent} from "./create-course/create-course.component";
import {EditCourseComponent} from "./edit-course/edit-course.component";

const routes: Routes = [
  {path: '', component: CoursesComponent},
  {path: 'create', component: CreateCourseComponent},
  {path: 'edit/:id', component: EditCourseComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
