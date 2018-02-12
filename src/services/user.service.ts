import { Injectable } from '@angular/core';
import { Toolbox } from 'bdt105toolbox/dist';
import { Http } from '@angular/http';

import { TranslateService } from './translate.service';
import { ConfigurationService } from './configuration.service';
import { ConnexionService } from './connexion.service';

@Injectable()
export class UserService {

    private toolbox: Toolbox = new Toolbox(); 
    private translateData : any; 
    private currentText: string;
    private language = "FR";
    private url = './assets/translate' + this.language + '.json';
    private storageKey = "connexion";

    constructor(private http: Http, private configurationService: ConfigurationService, private translateService: TranslateService, 
        private connexionService: ConnexionService){
    }

    private saveSuccess(callback: Function, data: any, user: any){
        let dat = JSON.parse(data._body);
        let usr = this.toolbox.readFromStorage("connexion");
        usr.decoded = user;
        this.connexionService.saveConnexion(usr);
        if (callback){
            callback(data._body);
        }
    }

    private saveFailure(callback: Function, error: any){
        if (callback){
            callback(error);
        }    
    }

    public saveUser(callbackSuccess: Function, callbackFailure: Function, user: any){
        if (user){
            this.http.put(this.configurationService.get().common.authentificationApiBaseUrl + "get", user).subscribe(
                (data: any) => this.saveSuccess(callbackSuccess, data, user),
                (error: any) => this.saveFailure(callbackFailure, error)
            );
        }
    }
}