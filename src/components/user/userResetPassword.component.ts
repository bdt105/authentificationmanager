import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Toolbox } from 'bdt105toolbox/dist';

import { UserComponent } from '../../components/user/user.component';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';
import { UserService } from '../../services/user.service';
import { FormValidationService } from '../../services/formValidation.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MiscellaneousService } from '../../services/miscellaneous.service';
import { GenericComponent } from '../generic.component';

@Component({
    selector: 'userResetPassword',
    templateUrl: './userResetPassword.component.html',
    providers: []
})

export class UserResetPasswordComponent extends GenericComponent{

    public formGroupResetPassword: any;    
    public errorLostPassword: any;
    public messageLostPassword: any;

    private emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    constructor (public formBuilder: FormBuilder, public formValidationService: FormValidationService, public connexionService: ConnexionTokenService,
        public userService: UserService, miscellaneousService: MiscellaneousService) {
        super(miscellaneousService);
        this.init();
    }

    init(){
        this.formGroupResetPassword = new FormGroup ({
            emailToSendNewPassword: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
        });
    }

    ngOnInit(){
        this.init();
    }

    private successLostPassword(data: any){
        if (data){
            if (data.status = "OK"){
                this.messageLostPassword = this.translate("A new password has been sent to you.");
            }else{
                this.failureLostPassword(data);
            }
        }else{
            this.failureLostPassword(data);
        }
    }

    private failureLostPassword(error: any){
        this.errorLostPassword = this.translate("A new password could not be sent to you. Please check your email address.");
    }
    
    sendLostPassword(){
        this.errorLostPassword = null;
        this.messageLostPassword = null;
        let subject = this.translate("Lost Password")
        let message = "<h2>" + subject + "</h2>" + this.translate("Hello, here is your new password [newPassword]");
        this.userService.sendGmailEmail(
            (data: any) => this.successLostPassword(data), 
            (error: any) => this.failureLostPassword(error), this.formGroupResetPassword.get('emailToSendNewPassword').value, subject, message);
    }    
}