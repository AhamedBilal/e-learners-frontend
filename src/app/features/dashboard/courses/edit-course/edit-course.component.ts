import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {SectionDialogComponent} from "../section-dialog/section-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {LessonDialogComponent} from "../lesson-dialog/lesson-dialog.component";
import {CourseService} from "../../../../core/services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CroppedEvent} from "../../../../shared/image-cropper/image-cropper.component";
import {BucketService} from "../../../../core/services/bucket.service";
import {environment} from "../../../../../environments/environment.prod";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public Editor = ClassicEditor;
  id: number;
  courseForm: FormGroup;
  categories: any = [];
  levels: any = [];

  imageChangedEvent: any;
  imgBase: string | undefined;
  private imgFile: File | undefined;

  sections: any[] = [];

  prices = [
    {id: 1, price: 0},
    {id: 1, price: 19.99},
    {id: 1, price: 24.99},
    {id: 1, price: 29.99},
    {id: 1, price: 34.99},
    {id: 1, price: 39.99},
    {id: 1, price: 44.99},
    {id: 1, price: 49.99},
    {id: 1, price: 54.99},
    {id: 1, price: 64.99},
    {id: 1, price: 69.99},
    {id: 1, price: 74.99},
    {id: 1, price: 79.99},
  ]
  publishForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private bucket: BucketService,
              private dialog: MatDialog,
              private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

    this.courseForm = _formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: [''],
      categoryId: ['', Validators.required],
      levelId: ['', Validators.required]
    });

    this.publishForm = this._formBuilder.group({
      price: [0, Validators.required],
    })


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);
  }

  ngOnInit() {
    this.getAllCat();
    this.getAllLevels();
    this.getData(this.id);
  }

  openSection(obj?: any) {
    const dialogRef = this.dialog.open(SectionDialogComponent, {
      width: '500px',
      data: {id: this.id, obj}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (obj) {
          let index = this.sections.indexOf(obj);
          this.sections[index] = result;
        } else {
          this.sections.push(result);
        }
      }
    });
  }

  openLesson(id: number, index: number, obj?: any) {
    const dialogRef = this.dialog.open(LessonDialogComponent, {
      width: '900px',
      data: {id, obj}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (obj) {
          let findIndex = this.sections[index].lessons.indexOf(obj);
          this.sections[index].lessons[findIndex] = {...result};
        } else {
          this.sections[index].lessons.push(result);
        }
      }
    });
  }

  getData(id: number) {
    this.courseService.getCourseById(id).subscribe(value => {
      console.log(value);
      if (value?.imageUrl) {
        this.imgBase = environment.fileURI + value.imageUrl;
      }
      this.sections = value.sections;
      this.courseForm.patchValue({...value});
    });
  }

  getAllCat() {
    this.courseService.getAllCategories().subscribe(value => {
      this.categories = value;
    })
  }

  getAllLevels() {
    this.courseService.getAllLevels().subscribe(value => {
      this.levels = value;
    })
  }

  onChangeHandler(ev: Event) {
    // @ts-ignore
    console.log(ev.target.files[0]);
    this.imageChangedEvent = ev;
  }

  imageCropped($event: CroppedEvent) {
    console.log($event);
    this.imgBase = $event.base64;
    this.imgFile = $event.file;
  }

  async save() {
    if (this.courseForm.valid) {
      if (this.imgFile) {
        await this.bucket.uploadFile(this.imgFile, this.imgFile.name);
        this.courseForm.patchValue({imageUrl: this.imgFile.name})
      }
      this.courseService.addCourse(this.courseForm.value).subscribe(value => {
        this.router.navigate(['edit', value], {relativeTo: this.route.parent});
      });
    }

  }

  deleteSection(section: any) {
    this.courseService.deleteSection(section.id).subscribe(value => {
      this.toastr.success("Section deleted!");
      let indexOf = this.sections.indexOf(section);
      this.sections.splice(indexOf, 1);
    })
  }

  deleteLesson(i: number, lesson: any) {
    this.courseService.deleteLesson(lesson.id).subscribe(value => {
      this.toastr.success("Lesson deleted!");
      let indexOf = this.sections[i].indexOf(lesson);
      this.sections[i].splice(indexOf, 1);
    })
  }
}
