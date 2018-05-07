import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Toolbox } from 'bdt105toolbox/dist';

import { ConnexionTokenService } from 'bdt105angularconnexionservice';
import { UserService } from '../../services/user.service';
import { FormValidationService } from '../../services/formValidation.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MiscellaneousService } from '../../services/miscellaneous.service';
import { GenericComponent } from '../generic.component';

@Component({
    selector: 'userChangePassword',
    templateUrl: './userChangePassword.component.html',
    providers: []
})

export class UserChangePasswordComponent extends GenericComponent{

    public formGroupChangePassword: FormGroup;

    public message: string;
    public error: string;
    private emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    constructor (public formBuilder: FormBuilder, public formValidationService: FormValidationService, public connexionService: ConnexionTokenService,
        public userService: UserService, miscellaneousService: MiscellaneousService) {
        super(miscellaneousService);
        this.init();
    }

    init(){
        this.formGroupChangePassword = this.formBuilder.group ({
            emailToChangePassword: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            currentPassword: ['', [Validators.required]],
            pass: this.formBuilder.group({
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required]
            }, {validator: this.formValidationService.matchPassword})       
        });
    }

    ngOnInit(){
        this.init();
    }

    private successChangePassword(data: any){
        this.message = this.translate("Your password has been changed, you can reconnect");
    }

    private failureChangePassword(error: any){
        this.message = this.translate("Your password could not be changed");        
    }

    changePassword(){
        let currentPassword = this.formGroupChangePassword.controls.currentPassword.value;
        let newPassword = this.formGroupChangePassword.get("pass").get("newPassword").value;
        let email = this.formGroupChangePassword.controls.emailToChangePassword.value;
        this.userService.changePassword(
            (data : any)=> this.successChangePassword(data), 
            (error: any) => this.failureChangePassword(error), email, currentPassword, newPassword);
    }
}