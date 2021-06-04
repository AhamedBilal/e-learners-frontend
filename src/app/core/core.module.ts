import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {FooterComponent} from './components/footer/footer.component';
import {OverlayModule} from "@angular/cdk/overlay";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
  ],
  exports: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    OverlayModule,
    RouterModule
  ]
})
export class CoreModule {
}
