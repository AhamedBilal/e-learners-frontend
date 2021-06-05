import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {CroppedEvent} from "../../../../shared/image-cropper/image-cropper.component";
import {DataService} from "../../../../core/services/data.service";
import {environment} from "../../../../../environments/environment.prod";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  imageChangedEvent: any;
  imgBase: string | undefined;
  private imgFile: File | undefined;
  userData: any;

  constructor(private userService: UserService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.currentUserData.subscribe(value => {
      this.userData = value;
      // @ts-ignore
      if (value?.profilePic) {
        // @ts-ignore
        this.imgBase = environment.fileURI + value.profilePic;
      }
    });
  }

  save() {
    if (this.imgFile) {
      const formData = new FormData();
      const imgName = this.userData.username + this.imgFile.name;
      formData.append('file', this.imgFile);
      formData.append('name', imgName);
      this.userService.editPhoto(formData).subscribe(value => {
        console.log(value);
        this.dataService.changeUserData({profilePic: imgName});
      })
    }
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
}
