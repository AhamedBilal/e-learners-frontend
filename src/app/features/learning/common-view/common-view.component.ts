import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {CourseService} from "../../../core/services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LearningService} from "../../../core/services/learning.service";

@Component({
  selector: 'app-common-view',
  templateUrl: './common-view.component.html',
  styleUrls: ['./common-view.component.scss']
})
export class CommonViewComponent implements OnInit {
  allData: any = [];
  fileURI = environment.fileURI;
  pageType: string | any;

  constructor(private courseService: CourseService, private learningService: LearningService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.pageType = this.router.url.split('/').pop();
      this.learningService.getCourses(this.pageType).subscribe(value => {
        console.log(value);
        this.allData = value;
      })
  }

}
