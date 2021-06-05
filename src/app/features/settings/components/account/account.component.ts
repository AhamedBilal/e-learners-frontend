import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {passwordValidator} from "../../../../core/validators/validators";
import {UserService} from "../../../../core/services/user.service";
import {DataService} from "../../../../core/services/data.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  accountForm: FormGroup;

  constructor(private fb: FormBuilder, private user: UserService, private data: DataService, private toastr: ToastrService) {
    this.accountForm = fb.group({
      email: ['', Validators.email],
      username: ['', Validators.required],
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {validators: passwordValidator()})
  }

  ngOnInit(): void {
    this.data.currentUserData.subscribe(value => {
      // @ts-ignore
      this.accountForm.patchValue({...value});
    })
  }

  saveChanges() {
    if (this.accountForm.valid && this.accountForm.dirty) {
      const obj = {...this.accountForm.value};
      delete  obj.confirmPassword;
      this.user.changePassword(obj).subscribe(value => {
        this.data.changeUserData({email: obj.email, username: obj.username});
        this.toastr.success("Updated Successfully!");
      });
    } else {
      this.accountForm.markAllAsTouched();
    }
  }
}
