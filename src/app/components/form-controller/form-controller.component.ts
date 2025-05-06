import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WindowConfiguration, fields } from 'src/app/framework/interface/window.configuration';

@Component({
    selector: 'form-controller',
    templateUrl: './form-controller.component.html'
})
export class FormControllerComponent implements OnInit {
    @Input() public windowConfig: WindowConfiguration;
    @Input() public formGroup: FormGroup;

    constructor() {
    }

    public ngOnInit(): void {
    }

}
