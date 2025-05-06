import { Component, Input, OnInit } from '@angular/core';
import { WindowConfiguration } from 'src/app/framework/interface/window.configuration';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() public windowConfig: WindowConfiguration;


  constructor() { }

  ngOnInit(): void {    
  }

}
