import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
// import { BaseComponent } from '../base.component';
import { Router } from '@angular/router';
// import { UserAuth } from '@core/domain-classes/user-auth';
// import { SecurityService } from '@core/security/security.service';
// import { ToastrService } from 'ngx-toastr';
// import { CommonError } from '@core/error-handler/common-error';
// import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
// import { User } from '@core/domain-classes/user';
// import { OnlineUser } from '@core/domain-classes/online-user';
// import { SignalrService } from '@core/services/signalr.service';

import { TextBoxComponent } from "@progress/kendo-angular-inputs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isLoading = false;
  resultMessage: string;
  fieldTextType: boolean = false;
  lat: number;
  lng: number;

  public form: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    loggedin: new FormControl(),
  });

  @ViewChild("password") public textbox: TextBoxComponent;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  public toggleVisibility(): void {
    const inputEl = this.textbox.input.nativeElement;
    inputEl.type = inputEl.type === "password" ? "text" : "password";
  }

  public login(): void {
    this.form.markAllAsTouched();
  }

  public clearForm(): void {
    this.form.reset();
  }


}
