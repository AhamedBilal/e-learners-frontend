import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../core/services/report.service";
import {MatDialog} from "@angular/material/dialog";
import {DetailDialogComponent} from "./detail-dialog/detail-dialog.component";

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  allData: any[] = [];

  constructor(private reportService: ReportService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.reportService.getPurchaseHistoryByUser().subscribe(value => {
      // @ts-ignore
      this.allData = value;
      console.log(value);
    })
  }

  viewDetail(data: any) {
    this.dialog.open(DetailDialogComponent, {
      width: '800px',
      data
    });
  }
}
