import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { LearningComponent } from './learning/learning.component';
import { CommonViewComponent } from './common-view/common-view.component';
import { CourseComponent } from './course/course.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    LearningComponent,
    CommonViewComponent,
    CourseComponent
  ],
    imports: [
        CommonModule,
        LearningRoutingModule,
        SharedModule
    ]
})
export class LearningModule { }
