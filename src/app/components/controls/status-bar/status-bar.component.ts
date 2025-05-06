import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageChangeEvent, PagerType } from '@progress/kendo-angular-pager';

@Component({
  selector: 'status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  @Input() public model = new FormGroup({});

  public pageSize = 1;
  public skip = 0;
  public pagedArticles = [];
  public total = 10;
  public pageSizes = false;
  public info = false;
  public prevNext = true;
  public type: PagerType = "input";
  public recordStatus = 'Ready';

  constructor() { }

  ngOnInit(): void {
    this.model.valueChanges.subscribe( () => {
      if(this.model.dirty == true) {
        this.recordStatus = 'Edited';
      }
    });
  }
  
  public onPageChange(e: PageChangeEvent): void {
    console.log(e);
    this.skip = e.skip;
    this.pageSize = e.take;
    this.recordStatus = 'Ready';
}

}
