import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Toolbox } from 'bdt105toolbox/dist';

import { GenericComponent } from '../../components/generic.component';
import { TranslateService } from '../../services/translate.service';
import { ConfigurationService } from '../../services/configuration.service';
import { ConnexionService } from '../../services/connexion.service';
import { FormValidationService } from '../../services/fromValidation.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    providers: []
})

export class UserComponent extends GenericComponent{

    public formGroup: any;
    public user: any = {};
    public isConnected = false;

    constructor (public configurationService: ConfigurationService, public translateService: TranslateService, 
        public formBuilder: FormBuilder, public formValidationService: FormValidationService, public connexionService: ConnexionService) {
        super(configurationService, translateService);

        this.init();
    }

    init(){
        this.isConnected = this.connexionService.isConnected();
        if (this.isConnected){
            this.user = this.connexionService.get().decoded;
        }
        this.formGroup = this.formBuilder.group ({
            login: [this.user.login, [Validators.required]],
            email: [this.user.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            pass: this.formBuilder.group({
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required]
            }, {validator: this.formValidationService.matchPassword}),
            lastname: [this.user.lastname, [Validators.required]],
            firstname: [this.user.firstname, [Validators.required]],
            phone: this.formBuilder.group({
                phone1: [this.user.phone1],
                phone2: [this.user.phone2],
                phone3: [this.user.phone3]
            }),
            language: [this.user.language, [Validators.required]],
            office: [this.user.office],
            address: this.formBuilder.group({
                address1: [this.user.address1],
                address2: [this.user.address2],
                postalcode: [this.user.postalcode],
                city: [this.user.city],
                country: [this.user.country],
            }),
            organisation: [this.user.organisation]
        });
    }

    private setUser(){
        for (var key in this.formGroup.controls){
            if (this.formGroup.controls[key].controls){
                for (var key1 in this.formGroup.controls[key].controls){
                    this.user[key1] = this.formGroup.controls[key].controls[key1].value;
                }
            }else{
                this.user[key] = this.formGroup.controls[key].value;
            }
        }
    }

    save(){
        this.setUser();
        console.log(this.user);
    }

}