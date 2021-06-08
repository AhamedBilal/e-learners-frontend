import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../core/services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../environments/environment.prod";
import {DataService} from "../../../core/services/data.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  private courseId: number;
  courseObj: any;
  fileURI = environment.fileURI;
  isAddedToCart = false;

  constructor(private courseService: CourseService,
              private route: ActivatedRoute,
              private data: DataService,
              private router: Router) {
    this.courseId = +(this.route.snapshot.paramMap.get('id') || 0);
  }

  ngOnInit(): void {
    this.data.currentCartData.subscribe(value => {
      // @ts-ignore
      this.isAddedToCart = value.includes(this.courseId);
    })
    this.getData();
  }

  getData() {
    this.courseService.getCourseById(this.courseId).subscribe(value => {
      this.courseObj = value;
      console.log(value);
    })
  }

  addToCart() {
    this.courseService.addToCart(this.courseId).subscribe(value => {
      console.log(value);
      this.data.addCartData(this.courseId);
      this.isAddedToCart = true;
    })
  }

}
