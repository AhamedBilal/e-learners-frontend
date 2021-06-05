import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  save() {

  }

  onChangeHandler(ev: Event) {
    // @ts-ignore
    console.log(ev.target.files[0]);
    const formData = new FormData();
    // @ts-ignore
    formData.append('file', ev.target.files[0]);
    this.userService.editPhoto(formData).subscribe(value => {
      console.log(value);
    })
  }
}
