import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../../core/services/course.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-section-dialog',
  templateUrl: './section-dialog.component.html',
  styleUrls: ['./section-dialog.component.scss']
})
export class SectionDialogComponent implements OnInit {

  sectionForm: FormGroup;
  isUpdate = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SectionDialogComponent>,
              private fb: FormBuilder, private courseService: CourseService, private toastr: ToastrService) {
    this.sectionForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      courseId: [data.id, Validators.required],
    });
    if (data?.obj) {
      this.isUpdate = true;
      this.sectionForm.patchValue({...data?.obj});
    }
  }

  ngOnInit(): void {
  }

  save() {
    if (this.sectionForm.valid) {
      if (!this.isUpdate) {
        this.courseService.addSection(this.sectionForm.value).subscribe(value => {
          this.toastr.success('Saved!');
          this.dialogRef.close(value);
        })
      } else {
        const obj = {...this.sectionForm.value, id: this.data.obj.id};
        this.courseService.updateSection(obj).subscribe(value => {
          this.toastr.success('Updated');
          this.dialogRef.close(value);
        })
      }
    } else {
      this.sectionForm.markAllAsTouched();
    }
  }

}
