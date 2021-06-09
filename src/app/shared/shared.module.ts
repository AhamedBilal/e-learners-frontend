import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';


@NgModule({
  declarations: [
    ImageCropperComponent,
    VjsPlayerComponent
  ],
    exports: [
        ImageCropperComponent,
        VjsPlayerComponent
    ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
