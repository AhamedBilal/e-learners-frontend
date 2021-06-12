import {Component, Inject, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.scss']
})
export class DetailDialogComponent implements OnInit {
  allData: any;
  fileURI = environment.fileURI;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DetailDialogComponent>) {
    this.allData = data;
  }

  ngOnInit(): void {
  }

}
