import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Toolbox } from 'bdt105toolbox/dist';

import { UserComponent } from '../../components/user/user.component';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';
import { UserService } from '../../services/user.service';
import { FormValidationService } from '../../services/fromValidation.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MiscellaneousService } from '../../services/miscellaneous.service';

@Component({
    selector: 'userComplete',
    templateUrl: './userComplete.component.html',
    providers: []
})

export class UserCompleteComponent extends UserComponent{

    constructor (public formBuilder: FormBuilder, public formValidationService: FormValidationService, public connexionService: ConnexionTokenService,
        public userService: UserService, miscellaneousService: MiscellaneousService) {
        super(formBuilder, formValidationService, connexionService, userService, miscellaneousService);
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
                lastname: [this.__user.lastname],
                firstname: [this.__user.firstname],
                phone: this.formBuilder.group({
                    phone1: [this.__user.phone1],
                    phone2: [this.__user.phone2],
                    phone3: [this.__user.phone3]
                }),
                language: [this.__user.language],
                office: [this.__user.office],
                address: this.formBuilder.group({
                    address1: [this.__user.address1],
                    address2: [this.__user.address2],
                    postalcode: [this.__user.postalcode],
                    city: [this.__user.city],
                    country: [this.__user.country],
                }),
                organisation: [this.__user.organisation]
            });
            this.formGroupPassword = this.formBuilder.group ({
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

    private successEncrypt(data: any){
        let dat = JSON.parse(data._body);
        let enc = dat.encrypted;
        let user: any = {};
        let currentUser = this.connexionService.getUser();
        user.iduser = currentUser.iduser;
        user.password = enc;
        this.userService.save(
            (data: any) => this.successSave(data),
            (error: any) => this.failureSave(error), user);
    }

    private failureEncrypt(data: any){

    }

    changePassword(){
        let password = this.formGroupPassword.controls.pass.controls.password.value;
        this.userService.encrypt(
            (data : any)=> this.successEncrypt(data), 
            (error: any) => this.failureEncrypt(error), password);
    }

}