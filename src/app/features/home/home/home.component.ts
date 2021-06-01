import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sliderImages = [
    'https://img-b.udemycdn.com/notices/home_banner/image_udlite/8a5d045c-2dd2-4a4d-bb0e-a487af8a5aa0.jpg?secure=9P3o98qmRQC-gJtOoIRvUw%3D%3D%2C1622258037',
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
