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

@Component({
    selector: 'userCreate',
    templateUrl: './userCreate.component.html',
    providers: []
})

export class UserCreateComponent extends UserComponent{

    constructor (public formBuilder: FormBuilder, public formValidationService: FormValidationService, public connexionService: ConnexionTokenService,
        public userService: UserService, miscellaneousService: MiscellaneousService) {
        super(formBuilder, formValidationService, connexionService, userService, miscellaneousService);
        this.init();
    }

    init(){
        this.formGroupUser = this.formBuilder.group ({
            login: ["", [Validators.required]],
            email: ["", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            pass: this.formBuilder.group({
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required]
            }, {validator: this.formValidationService.matchPassword})       
        });
    }

    ngOnInit(){
        this.init();
    }

    save(){
        this.saveUser(this.formGroupUser);
        this.userService.save((data: any) => this.successSave(data), (error: any) => this.failureSave(error), this.user);
        console.log(this.user);
    }    

    private successEncryptForCreate(data: any){
        let dat = JSON.parse(data._body);
        let enc = dat.encrypted;
        this.user = this.userService.getNewUser();
        this.user.login = this.formGroupUser.controls.login.value;
        this.user.email = this.formGroupUser.controls.email.value;
        this.user.password = enc;
        this.userService.save(
            (data: any) => this.successSave(data),
            (error: any) => this.failureSave(error), this.user);
    }

    private failureEncrypt(data: any){

    }

    createAndConnect(){
        let password = this.formGroupUser.controls.pass.controls.password.value;
        this.userService.encrypt(
            (data : any)=> this.successEncryptForCreate(data), 
            (error: any) => this.failureEncrypt(error), password);
    }
}