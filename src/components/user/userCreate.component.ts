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
    selector: 'userCreate',
    templateUrl: './userCreate.component.html',
    providers: []
})

export class UserCreateComponent extends GenericComponent{

    public error: any;
    public message: any;
    private user: any;
    public formGroupUser: FormGroup;

    constructor (public formBuilder: FormBuilder, public formValidationService: FormValidationService, public connexionService: ConnexionTokenService,
        public userService: UserService, miscellaneousService: MiscellaneousService) {
        super(miscellaneousService);
        this.init();
    }

    @Output() created: EventEmitter<any> = new EventEmitter<any>();
    
    init(){
        this.formGroupUser = this.formBuilder.group ({
            // login: ["", [Validators.required]],
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

    private successSave(data: any) {
        if (data) {
            if (data.affectedRows && data.affectedRows > 0) {
                this.message = this.translate("Successfully saved!");
                if (data.insertId){
                    this.user.iduser = data.insertId;
                }
                this.created.emit(this.user);                
            } else {
                if (data.insertedId && data.insertedId > 0) {
                    this.message = this.translate("Successfully created! You may connect.");
                } else {
                    this.message = this.translate("Error while saving!" + JSON.stringify(data));
                }
            }
        } else {
            this.message = this.translate("Error while saving!");
        }
    }

    private failureSave(error: any) {
        let err = JSON.parse(error._body);
        if (err.message && err.message.code == "ER_DUP_ENTRY"){
            this.error = this.translate("Impossible to create the user. The login or email may be already in use");
        }else{
            this.error = this.translate("Impossible to create the user!");
        }
        console.log(err);
    }

    saveUser(formGroup: FormGroup) {
        this.userService.set(formGroup, this.user);
        this.userService.save((data: any) => this.successSave(data), (error: any) => this.failureSave(error), this.user);
        console.log(this.user);
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
        this.user.login = this.formGroupUser.controls.email.value;
        this.user.email = this.formGroupUser.controls.email.value;
        this.user.password = enc;
        this.userService.signup(
            (data: any) => this.successSave(data),
            (error: any) => this.failureSave(error), this.user);
    }

    private failureEncrypt(data: any){
        let err = JSON.parse(data._body);
        if (err.message && err.message.code == "ER_DUP_ENTRY"){
            this.error = this.translate("Impossible to create the user. The login or email may be already in use");
        }else{
            this.error = this.translate("Impossible to create the user!");
        }
        console.log(err);
    }

    createAndConnect(){
        this.error = null;
        this.message = null;
        let password = this.formGroupUser.get("pass").get("password").value;
        this.userService.encrypt(
            (data : any)=> this.successEncryptForCreate(data), 
            (error: any) => this.failureEncrypt(error), password);
    }
}