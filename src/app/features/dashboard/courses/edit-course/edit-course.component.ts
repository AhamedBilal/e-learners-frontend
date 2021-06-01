import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {SectionDialogComponent} from "../section-dialog/section-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {LessonDialogComponent} from "../lesson-dialog/lesson-dialog.component";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public Editor = ClassicEditor;

  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngOnInit() {

  }
  openDialog() {
    const dialogRef = this.dialog.open(SectionDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openLesson() {
    const dialogRef = this.dialog.open(LessonDialogComponent, {
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
