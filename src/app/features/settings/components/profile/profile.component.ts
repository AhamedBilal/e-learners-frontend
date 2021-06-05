import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../../core/services/data.service";
import {UserService} from "../../../../core/services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService, private userService: UserService, private toastr: ToastrService) {
    this.profileForm = fb.group({
      fname: [''],
      lname: [''],
      headline: [''],
      bio: [''],
      website: [''],
      twitter: [''],
    })
  }

  ngOnInit(): void {
    this.dataService.currentUserData.subscribe(value => {
      // @ts-ignore
      this.profileForm.patchValue({...value});
    });
  }

  saveChanges() {
    if (this.profileForm.valid && this.profileForm.dirty) {
      this.userService.updateProfile({...this.profileForm.value}).subscribe(value => {
        this.dataService.changeUserData({...this.profileForm.value});
        // @ts-ignore
        this.toastr.success("Updated Successfully!");
      })
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

}
