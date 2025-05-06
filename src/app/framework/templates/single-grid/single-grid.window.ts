import { Component, Input, OnInit } from '@angular/core';
import { WindowConfiguration } from 'src/app/framework/interface/window.configuration';

@Component({
  selector: 'single-grid',
  templateUrl: './single-grid.window.html',
  styleUrls: ['./single-grid.window.scss']
})
export class SingleGridWindow implements OnInit {
  @Input() public windowConfig: WindowConfiguration;


  constructor() { }

  ngOnInit(): void {    
  }

}
