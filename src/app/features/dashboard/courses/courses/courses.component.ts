import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../../../core/services/course.service";
import {environment} from "../../../../../environments/environment.prod";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: any[] = [];
  fileURI = environment.fileURI;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.courseService.getAllCoursesForInstructor().subscribe(value => {
      this.courses = value;
      console.log(value);
    })
  }

}
