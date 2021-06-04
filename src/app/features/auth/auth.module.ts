import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordStrengthMeterModule} from "angular-password-strength-meter";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        PasswordStrengthMeterModule
    ]
})
export class AuthModule { }
