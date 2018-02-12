import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Toolbox } from 'bdt105toolbox/dist';

import { GenericComponent } from '../../components/generic.component';
import { LoginMessageComponent } from '../../components/login/loginMessage.component';
import { TranslateService } from '../../services/translate.service';
import { ConfigurationService } from '../../services/configuration.service';
import { ConnexionService } from '../../services/connexion.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: []
})

export class LoginComponent extends GenericComponent{
    login: string;
    password: string;
    rememberMe: boolean;
    data: any;
    contactEmail: string;
    loading = false;
    
    @ViewChild(LoginMessageComponent) loginMessage: LoginMessageComponent;

    public formGroup: any;
    private toolbox: Toolbox = new Toolbox();
    public isConnected = false;

    @Output() connected: EventEmitter<any> = new EventEmitter<any>();
    @Output() disconnected: EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router, 
        public configurationService: ConfigurationService, 
        public translateService: TranslateService, 
        public connexionService: ConnexionService, 
        private http: Http) {
        super(configurationService, translateService);
        this.init();
    }

    init(){
        this.formGroup = new FormGroup ({
            login: new FormControl('', [Validators.required]),
            password: new FormControl('', Validators.required),
            rememberMe: new FormControl()
        });
    }

    ngOnInit(){
        this.contactEmail = this.configurationService.get().common.contactEmail;
        this.isConnected = this.connexionService.isConnected();
    }
    
    private connect (){
        this.loading = true;
        this.connexionService.connect(
            (data: any) => this.connexionSuccess(data),
            (error: any) => this.connexionFailure(error),
            this.formGroup.get('login').value,
            this.formGroup.get('password').value,
            this.formGroup.get('rememberMe').value
        );
    }

    private connexionSuccess(data: any){
        this.loading = false;
        if (data){
            let dat = JSON.parse(data);
            if (dat.decoded){
                this.connected.emit(data);
                this.router.navigate[this.configurationService.get().common.homeUrl];
                this.refresh();
            }else{
                this.connexionFailure(null);
            }
        }
    }

    private connexionFailure = function(data: any){
        this.loading = false;
        this.disconnected.emit(null);
        this.refresh();
    }

    private refresh(){
        this.isConnected = this.connexionService.isConnected();
        this.loginMessage.refresh();
    }

    disconnect(){
        this.connexionService.disconnect();
        this.disconnected.emit(null);
        this.refresh();
    }

}