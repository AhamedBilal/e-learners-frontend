import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PhotoComponent } from './components/photo/photo.component';
import { AccountComponent } from './components/account/account.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    SettingsComponent,
    ProfileComponent,
    PhotoComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SettingsModule { }
