import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";
import {DataService} from "../../../../core/services/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../styles.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private data: DataService) {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginFormGroup.valid) {
      this.auth.login({...this.loginFormGroup.value}).subscribe(value => {
        console.log(value);
        this.auth.setToken(value.accessToken);
        this.data.changeUserData(value.user);
        this.router.navigate(['/']);
      }, error => console.log(error))
    } else {
      this.loginFormGroup.markAllAsTouched();
    }
  }

}
