import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Toolbox } from 'bdt105toolbox/dist';

import { GenericComponent } from '../../components/generic.component';
import { TranslateService } from '../../services/translate.service';
import { ConfigurationService } from '../../services/configuration.service';
import { ConnexionService } from '../../services/connexion.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: []
})

export class LoginComponent extends GenericComponent{
    login: string;
    password: string;
    rememberMe: boolean;
    message: string;
    error: string;
    data: any;
    contactEmail: string;

    private toolbox: Toolbox = new Toolbox();

    @Output() connected: EventEmitter<any> = new EventEmitter<any>();
    @Output() disconnected: EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router, 
        public configurationService: ConfigurationService, 
        public translateService: TranslateService, 
        public connexionService: ConnexionService, 
        private http: Http) {
        super(configurationService, translateService);
    }

    ngOnInit(){
        this.contactEmail = this.configurationService.get().common.contactEmail;
    }

    private connect (){
        this.connexionService.connect(
            (data: any) => this.connexionSuccess(data),
            (error: any) => this.connexionFailure(error)
        );
    }

    private connexionSuccess(data: any){
        this.message = this.translate("Connexion succeded");
        this.connected.emit(data);
        this.router.navigate[this.configurationService.get().common.homeUrl];
    }

    private connexionFailure = function(data: any){
        this.error = this.translateService.translate("Connexion impossible! Please double check your data connexion");
        this.connexion = null;
        this.disconnected.emit(null);
    }

    disconnect(){
        this.connexionService.disconnect();
        this.disconnected.emit(null);
    }

}