import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Toolbox } from 'bdt105toolbox/dist';

import { GenericComponent } from '../../components/generic.component';
import { ConfigurationService } from 'bdt105angularconfigurationservice';
import { TranslateLocalService } from 'bdt105angulartranslateservice';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';
import { UserService } from '../../services/user.service';
import { FormValidationService } from '../../services/fromValidation.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

export class UserComponent extends GenericComponent {

    public formGroupUser: any;
    public formGroupPassword: any;
    public isConnected = false;

    public message: string;
    public showAlert = false;

    protected __user: any;

    @Input() set user(value: any) {
        this.__user = value;
    };

    @Input() test: string;

    get user() {
        return this.__user;
    }

    @Output() connected: EventEmitter<any> = new EventEmitter<any>();

    constructor(public configurationService: ConfigurationService, public translateService: TranslateLocalService,
        public formBuilder: FormBuilder, public formValidationService: FormValidationService, public connexionService: ConnexionTokenService,
        public userService: UserService) {
        super(configurationService, translateService);
    }

    ngOnInit() {
    }

    successSave(data: any) {
        if (data) {
            if (data.affectedRows && data.affectedRows > 0) {
                this.showAlert = true;
                this.message = this.translate("Successfully saved!");
                if (data.insertId){
                    this.__user.iduser = data.insertId;
                }
                this.connected.emit(this.__user);
            } else {
                if (data.insertedId && data.insertedId > 0) {
                    this.showAlert = true;
                    this.message = this.translate("Successfully added!");
                } else {
                    this.showAlert = true;
                    this.message = this.translate("Error while saving!" + JSON.stringify(data));
                }
            }
        } else {
            this.showAlert = true;
            this.message = this.translate("Error while saving!");
        }
    }

    failureSave(error: any) {
        this.showAlert = true;
        this.message = this.translate("Error while saving!" + JSON.stringify(error));
    }

    saveUser(formGroup: FormGroup) {
        this.userService.set(formGroup, this.__user);
        this.userService.save((data: any) => this.successSave(data), (error: any) => this.failureSave(error), this.__user);
        console.log(this.__user);
    }

}