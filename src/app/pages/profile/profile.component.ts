import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { countries } from 'src/app/resources/countries';
import { FormModel } from 'src/app/framework/models/form.model';

import { SelectEvent, FileRestrictions } from '@progress/kendo-angular-upload';
import { CustomMessagesService } from 'src/app/services/custom-messages.service';
import { MessageService } from '@progress/kendo-angular-l10n';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { WindowConfiguration } from 'src/app/framework/interface/window.configuration';

@Component({
    selector: 'app-profile-component',
    templateUrl: './profile.component.html',
    styles: [
        `
          .k-form {
            width: 100%;
          }
        `,
      ]
})
export class ProfileComponent implements OnInit, AfterViewInit {
    @Input() public windowConfig: WindowConfiguration;

    public formGroup: FormGroup = new FormGroup({});
    public countries = countries;
    public phoneNumberMask = '(+9) 0000-000-00-00';
    public fileRestrictions: FileRestrictions = {
        allowedExtensions: ['.png', '.jpeg', '.jpg']
    };
    public avatars?: NodeList;

    public formValue: FormModel | null = {
        ProductID: undefined,
        ProductName:  undefined,
        UnitPrice: undefined,
        QuantityPerUnit: undefined
    };

    public customMsgService: CustomMessagesService;

    constructor(public msgService: MessageService, public window : WindowRef) {
        this.customMsgService = this.msgService as CustomMessagesService;
    }

    ngOnInit() {
        var me = this;
        me.windowConfig.components.window = me;
        this.controlSetup();
    }

    ngAfterViewInit() {
        this.setAvatar();
    }

    public dataBinding(record: any) {
        var me = this;
        me.formGroup.controls['ProductID'].setValue('test');
    }

    public controlSetup() {
        var me = this;
        me.formGroup = new FormGroup({
            ProductID: new FormControl(null,[Validators.required]),
            ProductName: new FormControl(null,[Validators.required]),
            UnitPrice: new FormControl(null,[Validators.required]),
            QuantityPerUnit: new FormControl(null,[Validators.required])
        });
        me.dataBinding(me.windowConfig.window.recordSelected[0]);
        me.windowConfig.master.form = me.formGroup;
    }

    public setAvatar() {
        this.avatars = document.querySelectorAll('.k-avatar .k-avatar-image');
        const avatarImg = localStorage.getItem('avatar');
        if (avatarImg) {
            this.avatars.forEach((avatar: any) => {
                avatar.style['background-image'] = `url("${avatarImg}")`;
            });
        }
    }

    public saveChanges(): void {
        this.formGroup.markAllAsTouched();
        const formValues = JSON.stringify(this.formGroup.value);
        localStorage.setItem('form', formValues);

        this.formGroup.markAsPristine();

        // this.notificationService.show({
        //     content: 'Profile changes have been saved.',
        //     animation: { type: 'slide', duration: 500 },
        //     position: { horizontal: 'center', vertical: 'bottom' },
        //     type: { style: 'success', icon: true },
        //     hideAfter: 2000
        // });
    }

    public cancelChanges(): void {
        this.controlSetup();
    }

    public bringtoFront() {
        var me = this;
        me.window.window.instance.bringToFront()
    }
}
