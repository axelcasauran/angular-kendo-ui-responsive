import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { CustomMessagesService } from 'src/app/services/custom-messages.service';
import { MessageService } from '@progress/kendo-angular-l10n';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { WindowConfiguration } from 'src/app/framework/interface/window.configuration';

@Component({
    selector: 'app-profile-details-window',
    templateUrl: './profile-details.window.html'
})
export class ProfileDetailsWindow implements OnInit {
    @Input() public windowConfig: WindowConfiguration;

    public formGroup: FormGroup = new FormGroup({});

    public customMsgService: CustomMessagesService;

    public formGroupDetail: FormGroup;

    public isLoading: boolean = true;

    constructor(public msgService: MessageService, public window : WindowRef, private formBuilder: FormBuilder,) {
        this.customMsgService = this.msgService as CustomMessagesService;
    }

    ngOnInit() {
        var me = this;
        me.controlSetup();
    }

    public controlSetup() {
        var me = this;
        me.formGroup = me.windowConfig.master.form;
        me.windowConfig.components.window = me;
        me.isLoading = me.windowConfig.window.loading.isLoading;
    }

}

