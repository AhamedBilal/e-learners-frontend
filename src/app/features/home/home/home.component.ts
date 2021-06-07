import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../../core/services/course.service";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sliderImages = [
    'https://img-b.udemycdn.com/notices/home_banner/image_udlite/8a5d045c-2dd2-4a4d-bb0e-a487af8a5aa0.jpg?secure=9P3o98qmRQC-gJtOoIRvUw%3D%3D%2C1622258037',
  ];

  topCourses: any = [];
  topCategories: any = [];
  fileURI = environment.fileURI;


  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.getTopCategories();
    this.getTopCourses();
  }

  getTopCourses() {
    this.courseService.getTopCourses().subscribe(value => {
      this.topCourses = value;
    })
  }

  getTopCategories() {
    this.courseService.getAllCategories().subscribe(value => {
      this.topCategories = value;
    })
  }

}
