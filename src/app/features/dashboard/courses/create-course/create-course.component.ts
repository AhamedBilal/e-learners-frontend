import { Component, OnInit } from '@angular/core';

// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../../core/services/course.service";
import {CroppedEvent} from "../../../../shared/image-cropper/image-cropper.component";
import {BucketService} from "../../../../core/services/bucket.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  public Editor = ClassicEditor;
  courseForm: FormGroup;

  categories: any = [];
  levels: any = [];

  imageChangedEvent: any;
  imgBase: string | undefined;
  private imgFile: File | undefined;

  constructor(private fb: FormBuilder, private courseService: CourseService,
              private bucket: BucketService, private router: Router, private route: ActivatedRoute) {
    this.courseForm = fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: [''],
      categoryId: ['', Validators.required],
      levelId: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllCat();
    this.getAllLevels();
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
}
