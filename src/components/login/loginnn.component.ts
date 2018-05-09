import { Component, Input, Output, EventEmitter, OnInit, ViewChild, NgZone } from '@angular/core';
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
    public message: string;
    public error: string;
    public newUser: any;

    
    private application: string;
    public showNewAccount: boolean = false;
    public showResetPassword = false;
    public showChangePassword = false;

    @Output() connected: EventEmitter<any> = new EventEmitter<any>();
    @Output() disconnected: EventEmitter<any> = new EventEmitter<any>();

    constructor(public http: Http, private router: Router, 
        public connexionService: ConnexionTokenService, 
        public userService: UserService,
        public activatedRoute: ActivatedRoute, 
        public formValidationService: FormValidationService, public ngZone: NgZone,
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
        if (this.activatedRoute.snapshot.params["application"]){
            this.application = this.activatedRoute.snapshot.params["application"];
            this.toolbox.writeToStorage("application", {"application": this.application}, false);
        }
    }    
    
    private setMessages(error: string, message: string){
        this.error = error;
        this.message = message;
    }
    private fakeConnexion(){
        return {"decoded": {"login": "fake", "password": "fake", "email": "email@fake.com"}};
    }
    
    connect (){
        this.connexionAttempt = true;
        this.loading = true;
        this.setMessages(null, null); 
        // if (this.formGroupLogin.get('login').value == "julius"){ // WARNING BACKDOOR -->> TO BE REMOVED !!!!
        //     this.connexionSuccess(JSON.stringify(this.fakeConnexion()));
        //     return;
        // }
        let body: any = {};
        body.login = this.formGroupLogin.get('login').value;
        body.password = this.formGroupLogin.get('password').value;
        this.http.post(this.connexionService.authentificationApiBaseUrl + "get", body).subscribe(
            (data: any) => this.connexionSuccess(data),
            (error: any) => this.connexionFailure(error)
        );
        
        // this.connexionService.connect(
        //     (data: any) => this.connexionSuccess(data),
        //     (error: any) => this.connexionFailure(error),
        //     this.formGroupLogin.get('login').value,
        //     this.formGroupLogin.get('password').value,
        //     this.formGroupLogin.get('rememberMe').value
        // );

        this.connexionService.connect2(this.http,
            (data: any) => this.connexionSuccess(data),
            (error: any) => this.connexionFailure(error),
            this.formGroupLogin.get('login').value,
            this.formGroupLogin.get('password').value,
            this.formGroupLogin.get('rememberMe').value
        );
    }

    private connexionOk(data: any){
        if (data){
            data.type = "connexion";
            data.rememberMe = this.formGroupLogin.get('rememberMe').value;
            parent.postMessage(data, "*");
            if (data.decoded){
                this.setMessages(null, this.translate("Welcome ") + data.decoded.email + "!"); 
                this.connected.emit(data);
            }else{
                this.connexionFailure(null);
            }
            console.log(data);
            this.ngZone.run(() => { // refresh
            });
        }
    }

    private connexionSuccess(data: any){
        this.loading = false;
        if (data && this.toolbox.isJson(data)){
            let dat = JSON.parse(data);
            this.connexionOk(dat);
        }
    }

    private connexionFailure (data: any) {
        this.loading = false;
        this.disconnected.emit(null);
        this.setMessages(this.translate("Impossible to connect. Please check login and password."), null); 
    }

    disconnect(){
        this.setMessages(null, null); 
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
            gapi.load('auth2', () => {
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
                        this.connexionOk(dat);
                    });
                });
            });        
        }
    }    

    userCreated(user: any){
        this.showNewAccount = false;
        this.setMessages(null, this.translate("Your account has been created. You may now connect.")); 
    }

}