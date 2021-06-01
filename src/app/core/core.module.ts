import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import {OverlayModule} from "@angular/cdk/overlay";



@NgModule({
    declarations: [
        NavBarComponent,
        FooterComponent
    ],
    exports: [
        NavBarComponent
    ],
    imports: [
        CommonModule,
        OverlayModule
    ]
})
export class CoreModule { }