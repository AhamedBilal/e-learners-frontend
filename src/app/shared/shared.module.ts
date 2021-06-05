import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';


@NgModule({
  declarations: [
    ImageCropperComponent
  ],
  exports: [
    ImageCropperComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
