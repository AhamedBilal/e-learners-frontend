import {Component, Inject, OnInit} from '@angular/core';
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../../core/services/course.service";
import {ToastrService} from "ngx-toastr";
import {BucketService} from "../../../../core/services/bucket.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-lesson-dialog',
  templateUrl: './lesson-dialog.component.html',
  styleUrls: ['./lesson-dialog.component.scss']
})
export class LessonDialogComponent implements OnInit {

  public Editor = ClassicEditor;

  lessonForm: FormGroup;
  isUpdate = false;
  private videoFile: any;
  private filename: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LessonDialogComponent>,
              private fb: FormBuilder, private courseService: CourseService, private toastr: ToastrService, private bucket: BucketService) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      content: ['', Validators.required],
      sectionId: [data.id, Validators.required]
    });
    if (data?.obj) {
      this.isUpdate = true;
      this.lessonForm.patchValue({...data?.obj});
    }
  }

  ngOnInit(): void {

  }

  get type() {
    return this.lessonForm.get('type')?.value;
  }

  get title() {
    return this.lessonForm.get('title')?.value;
  }

  async save() {
    if (this.lessonForm.valid) {
      if (this.type === 'video') {
        if (this.videoFile) {
          await this.bucket.uploadFile(this.videoFile, this.filename);
        } else {
          this.toastr.warning('Select a video');
          return;
        }
      }
      if (!this.isUpdate) {
        this.courseService.addLesson(this.lessonForm.value).subscribe(value => {
          this.toastr.success('Saved!');
          this.dialogRef.close(value);
        })
      } else {
        const obj = {...this.lessonForm.value, id: this.data.obj.id};
        this.courseService.updateLesson(obj).subscribe(value => {
          this.toastr.success('Updated');
          this.dialogRef.close(value);
        })
      }
    } else {
      this.lessonForm.markAllAsTouched();
    }
  }

  onChanageHandler($event: any) {
    this.videoFile = $event.target.files[0];
    this.filename = this.title + this.data.id + formatDate(Date.now(), 'yyyyMMdd_HHmmsss', 'en-US') + '.' + this.videoFile.name.split('.').pop();
    this.lessonForm.patchValue({content: this.filename});
  }
}
