import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PhotoComponent } from './components/photo/photo.component';
import { AccountComponent } from './components/account/account.component';


@NgModule({
  declarations: [
    SettingsComponent,
    ProfileComponent,
    PhotoComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
