import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../../core/services/course.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  private courseId: number;

  constructor(private courseService: CourseService, private route: ActivatedRoute, private router: Router) {
     this.courseId = +(this.route.snapshot.paramMap.get('id') || 0);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.courseService.getCourseById(this.courseId).subscribe(value => {
      console.log(value);
    })
  }

}
