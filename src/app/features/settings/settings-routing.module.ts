import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingsComponent} from "./settings/settings.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {PhotoComponent} from "./components/photo/photo.component";
import {AccountComponent} from "./components/account/account.component";

const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      {path: 'edit-profile', component: ProfileComponent},
      {path: 'edit-photo', component: PhotoComponent},
      {path: 'edit-account', component: AccountComponent},
      {path: '', pathMatch: 'full', redirectTo: 'edit-profile'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
