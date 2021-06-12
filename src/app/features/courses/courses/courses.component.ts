import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../../core/services/course.service";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  allData: any[] = [];
  fileURI = environment.fileURI;


  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.route.url.subscribe(value => {
      if (this.route.snapshot.url[0].path === 'search') {
        if (this.route.snapshot.queryParamMap.has('k')) {
          let k = this.route.snapshot.queryParamMap.get('k');
          this.searchCourse(k);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        if (this.route.snapshot.paramMap.has('category')) {
          let k = this.route.snapshot.paramMap.get('category');
          this.searchByCategory(k);
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }

  searchCourse(keyword: any) {
    this.courseService.searchCourse(keyword).subscribe(value => {
      console.log(value);
      this.allData = value;
    });
  }

  searchByCategory(keyword: any) {
    this.courseService.getCourseByCategoryName(keyword).subscribe(value => {
      console.log(value);
      this.allData = value;
    });
  }

  getLessons(data: any) {
    // @ts-ignore
    return data?.sections?.reduce((acc, curr) => acc + curr?.lessons?.length, 0) || 0;
  }
}
