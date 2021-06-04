import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../styles.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  passwordStrength = 0;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private toastr: ToastrService) {
    this.signUpForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  get password() {
    return this.signUpForm.get('password')?.value;
  }

  signUp() {
    if (this.signUpForm.valid) {
      const obj: any = {...this.signUpForm.value};
      const names = obj.fullName.trim().split(" ");
      obj.fname = names[0];
      if (names.length > 1) {
        obj.lname = names[names.length - 1];
      }
      delete obj.fullName;
      this.auth.signUp(obj).subscribe(value => {
        this.auth.setToken(value.accessToken);
        this.toastr.success('SignUp Successful!');
        location.reload();
        this.router.navigate(['/auth/login']);
      });
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

  getStrength($event: number) {
    this.passwordStrength = $event;
  }
}
