import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { GenericComponent } from '../../components/generic.component';
import { ConfigurationService } from 'bdt105angularconfigurationservice';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MiscellaneousService } from '../../services/miscellaneous.service';
import { FormValidationService } from '../../services/formValidation.service';

declare const gapi : any;

@Component({
    selector: 'loginnn',
    templateUrl: './loginnn.component.html',
    providers: []
})

export class LoginnnComponent extends GenericComponent{
    login: string;
    password: string;
    rememberMe: boolean;
    data: any;
    contactEmail: string;
    loading = false;
    connexionAttempt = false;
    public loadComplete = false;

    public formGroupLogin: any;
    public wrongLogin = false;
    public newUser: any;

    private landPage: string;
    public showNewAccount: boolean = false;
    public showResetPassword = false;
    public showChangePassword = false;

    @Output() connected: EventEmitter<any> = new EventEmitter<any>();
    @Output() disconnected: EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router, 
        public connexionService: ConnexionTokenService, 
        public userService: UserService,
        private http: Http, private activatedRoute: ActivatedRoute, 
        public formValidationService: FormValidationService,
        miscellaneousService: MiscellaneousService){
        super(miscellaneousService);
        this.formGroupLogin = new FormGroup ({
            login: new FormControl('', [Validators.required]),
            password: new FormControl('', Validators.required),
            rememberMe: new FormControl()
        });
    }

    init(){
        if (!this.loadComplete){
            let load = this.miscellaneousService.getConfigurationPromise().
            then(()=>{
                this.loadComplete = true;
                console.log("load is complete");
                this.connexionService.authentificationApiBaseUrl = this.miscellaneousService.configuration().common.authentificationApiBaseUrl;
        });
        }
        this.activatedRoute.params.subscribe(params => {
            this.getParams();
        });       
    }

    ngOnInit(){
        this.init();
    }
    
    getParams (){
        if (this.activatedRoute.snapshot.params["landPage"]){
            this.landPage = this.activatedRoute.snapshot.params["landPage"];
        }
    }    
    
    private fakeConnexion(){
        return {"decoded": {"login": "fake", "password": "fake", "email": "email@fake.com"}};
    }
    
    connect (){
        this.connexionAttempt = true;
        this.loading = true;
        this.wrongLogin = false;        
        if (this.formGroupLogin.get('login').value == "julius"){ // WARNING BACKDOOR -->> TO BE REMOVED !!!!
            this.connexionSuccess(JSON.stringify(this.fakeConnexion()));
            return;
        }
        this.connexionService.connect(
            (data: any) => this.connexionSuccess(data),
            (error: any) => this.connexionFailure(error),
            this.formGroupLogin.get('login').value,
            this.formGroupLogin.get('password').value,
            this.formGroupLogin.get('rememberMe').value
        );
    }

    private connexionSuccess(data: any){
        this.loading = false;
        if (data && this.toolbox.isJson(data)){
            let dat = JSON.parse(data);
            dat.type = "connexion";
            dat.rememberMe = this.formGroupLogin.get('rememberMe').value;
            parent.postMessage(dat, "*");
            console.log(dat);
            if (dat.decoded){
                this.toolbox.writeToStorage("connexion", dat, false);                
                this.connected.emit(data);
            }else{
                this.connexionFailure(null);
            }
        }
    }

    private connexionFailure = function(data: any){
        this.loading = false;
        this.disconnected.emit(null);
        this.wrongLogin = true;
    }

    disconnect(){
        this.wrongLogin = false;
        
        this.connexionAttempt = false;
        this.connexionService.disconnect();
        this.disconnected.emit(null);
        parent.postMessage(null, "*");
    }

    getCurrentUser(){
        return this.connexionService.get().decoded;
    }

    getApplicationName(){
        return this.toolbox.readFromStorage("configuration").common.applicationName;
    }

    googleLogin() {
        if (gapi){
            gapi.load('auth2', function () {
                gapi.auth2.init()
                let googleAuth = gapi.auth2.getAuthInstance();
                googleAuth.then(() => {
                    googleAuth.signIn({scope: 'profile email', prompt: 'select_account'}).then(googleUser => {
                        let dat: any = {};
                        dat.googleSignIn = true;
                        dat.type = "connexion";
                        dat.decoded = googleUser.getBasicProfile();
                        dat.decoded.email = dat.decoded.U3; 
                        dat.decoded.firstname = dat.decoded.ofa;
                        dat.decoded.lastname = dat.decoded.wea;
                        dat.decoded.image = dat.decoded.Paa;
                        parent.postMessage(dat, "*");
                        this.connexionService.saveConnexion(dat, true);
                        this.connected.emit(dat);
                        this.refresh();
                        console.log(dat);
                    });
                });
            });        
        }
    }    

    newAccount(){
        this.newUser = {};
        this.newUser.email = this.formGroupLogin.get('login').value;
        this.newUser.login = this.formGroupLogin.get('login').value;
        this.showNewAccount = !this.showNewAccount;
    }

    userCreated(user: any){
        let dat: any = {};
        dat.newlyCreated = true;
        dat.type = "connexion";
        dat.rememberMe = this.formGroupLogin.get('rememberMe').value;
        dat.decoded = user;
        parent.postMessage(dat, "*");
    }

}