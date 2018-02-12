import { Injectable } from '@angular/core';
import { Toolbox } from 'bdt105toolbox/dist';
import { Http } from '@angular/http';

import { TranslateService } from './translate.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class ConnexionService {

    private toolbox: Toolbox = new Toolbox(); 
    private translateData : any; 
    private currentText: string;
    private language = "FR";
    private url = './assets/translate' + this.language + '.json';
    private storageKey = "connexion";

    constructor(private http: Http, private configurationService: ConfigurationService, private translateService: TranslateService){
    }

    public connect (callbackSuccess: Function, callbackFailure: Function, forever: boolean = false){
        this.http.get(this.configurationService.get().common.authentificationApiBaseUrl + "get").subscribe(
            (data: any) => this.connexionSuccess(callbackSuccess, data, forever),
            (error: any) => this.connexionFailure(callbackFailure, error)
        );
    }

    private connexionSuccess(callback: Function, data: any, forever: boolean){
        this.toolbox.writeToStorage(this.storageKey, data._body, forever);
        if (callback){
            callback(data._body);
        }
    }

    private connexionFailure(callback: Function, error: any){
        if (callback){
            callback(error);
        }    
    }

    disconnect(){
        this.toolbox.removeFromStorage(this.storageKey);
    }

}