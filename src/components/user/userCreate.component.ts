import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Toolbox } from 'bdt105toolbox/dist';

import { UserComponent } from '../../components/user/user.component';
import { ConfigurationService } from 'bdt105angularconfigurationservice';
import { TranslateLocalService } from 'bdt105angulartranslateservice';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';
import { UserService } from '../../services/user.service';
import { FormValidationService } from '../../services/fromValidation.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'userCreate',
    templateUrl: './userCreate.component.html',
    providers: []
})

export class UserCreateComponent extends UserComponent{


    constructor (public configurationService: ConfigurationService, public translateService: TranslateLocalService, 
        public formBuilder: FormBuilder, public formValidationService: FormValidationService, public connexionService: ConnexionTokenService,
        public userService: UserService) {
        super(configurationService, translateService, formBuilder, formValidationService, connexionService, userService);
        this.init();
    }

    init(){
        this.isConnected = this.connexionService.isConnected();
        if (this.isConnected){
            this.__user = this.connexionService.getUser();
        }
        if (this.user){
            this.formGroupUser = this.formBuilder.group ({
                login: [this.__user.login, [Validators.required]],
                email: [this.__user.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
                pass: this.formBuilder.group({
                    password: ['', Validators.required],
                    confirmPassword: ['', Validators.required]
                }, {validator: this.formValidationService.matchPassword})       
            });
        }
    }

    ngOnInit(){
        this.init();
    }

    save(){
        this.saveUser(this.formGroupUser);
        this.userService.save((data: any) => this.successSave(data), (error: any) => this.failureSave(error), this.__user);
        console.log(this.__user);
    }    

    private successEncryptForCreate(data: any){
        let dat = JSON.parse(data._body);
        let enc = dat.encrypted;
        this.__user = this.userService.getNewUser();
        this.userService.set(this.formGroupUser, this.__user);
        delete(this.__user.confirmPassword);
        this.__user.password = enc;
        this.userService.save(
            (data: any) => this.successSave(data),
            (error: any) => this.failureSave(error), this.__user);
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