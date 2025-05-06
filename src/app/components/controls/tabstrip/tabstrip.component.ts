import { Component, Input, OnInit } from '@angular/core';
import { WindowConfiguration } from 'src/app/framework/interface/window.configuration';

@Component({
  selector: 'tabstrip',
  templateUrl: './tabstrip.component.html',
  styleUrls: ['./tabstrip.component.scss']
})
export class TabstripComponent implements OnInit {
  @Input() public windowConfig: WindowConfiguration;

  bottomPadding = 35;

  constructor() { }

  ngOnInit(): void {
    if(this.windowConfig.configuration.type == "singlegrid") {
      this.bottomPadding = 0;
    }
  }

}
