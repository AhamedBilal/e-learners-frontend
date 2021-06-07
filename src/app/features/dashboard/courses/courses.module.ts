import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { EditCourseComponent } from './edit-course/edit-course.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ReactiveFormsModule} from "@angular/forms";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import { SectionDialogComponent } from './section-dialog/section-dialog.component';
import { LessonDialogComponent } from './lesson-dialog/lesson-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatRadioModule} from "@angular/material/radio";
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [
    CoursesComponent,
    CreateCourseComponent,
    EditCourseComponent,
    SectionDialogComponent,
    LessonDialogComponent
  ],
    imports: [
        CommonModule,
        CoursesRoutingModule,
        MatTooltipModule,
        CKEditorModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatButtonModule,
        MatDialogModule,
        MatRadioModule,
        SharedModule
    ]
})
export class CoursesModule { }
