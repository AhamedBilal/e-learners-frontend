import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core'

import videojs from 'video.js';
import {DataService} from "../../core/services/data.service";


@Component({
  selector: 'app-vjs-player',
  templateUrl: './vjs-player.component.html',
  styleUrls: ['./vjs-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  // @ts-ignore
  @ViewChild('target', {static: true}) target: ElementRef;
  isChanged = false;

  @Input('options') set setOptions(obj: any) {
    this.options = obj;
    if (this.player) {
      this.player.src(this.options.sources[0].src);
      this.player.load();
    }
  }

    // @ts-ignore
  options: any;
  // @ts-ignore
  player: videojs.Player;

  constructor(
    private elementRef: ElementRef,
    private dataService: DataService
  ) { }

  ngOnInit() {
    // instantiate Video.js
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      // @ts-ignore
      console.log('onPlayerReady', this);
    });
  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
