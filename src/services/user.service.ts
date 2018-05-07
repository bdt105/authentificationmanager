import { Injectable } from '@angular/core';
import { Toolbox } from 'bdt105toolbox/dist';
import { Http } from '@angular/http';

import { ConnexionTokenService } from 'bdt105angularconnexionservice';
import { MiscellaneousService } from './miscellaneous.service';

@Injectable()
export class UserService {

    private toolbox: Toolbox = new Toolbox(); 
    private translateData : any; 
    private currentText: string;
    private language = "FR";
    private url = './assets/translate' + this.language + '.json';
    private storageKey = "connexion";

    constructor(private http: Http, private connexionService: ConnexionTokenService, private miscellaneousService: MiscellaneousService){
    }

    private successSave(callbackSuccess: Function, callbackFailure: Function, data: any, user: any){
        let dat = JSON.parse(data._body);
        if (dat.status == "ERR"){
            if (callbackFailure){
                callbackFailure(dat);
            }
        }else{
            let usr = this.toolbox.readFromStorage("connexion");
            usr.decoded = user;
            this.connexionService.saveConnexion(usr);
            if (callbackSuccess){
                callbackSuccess(dat);
            }
        }
    }

    private failureSave(callback: Function, error: any){
        if (callback){
            callback(error);
        }    
    }

    public save(callbackSuccess: Function, callbackFailure: Function, user: any){
        let token = this.connexionService.getToken();
        let usr = this.toolbox.cloneObject(user);
        delete(usr.iat);
        if (token && user){
            let body: any = {};
            body.token = token;
            body.object = usr;
            body.idFieldName = "iduser";
            console.log(JSON.stringify(body));
            this.http.put(this.miscellaneousService.configuration().common.authentificationApiBaseUrl + "user", body).subscribe(
                (data: any) => this.successSave(callbackSuccess, callbackFailure, data, user),
                (error: any) => this.failureSave(callbackFailure, error)
            );
        }
    }

    public delete(callbackSuccess: Function, callbackFailure: Function, user: any){
        let token = this.connexionService.getToken();        
        if (user){
            this.http.delete(this.miscellaneousService.configuration().common.authentificationApiBaseUrl + "get", user).subscribe(
                (data: any) => this.successSave(callbackSuccess, callbackFailure, data, user),
                (error: any) => this.failureSave(callbackFailure, error)
            );
        }
    }

    public encrypt(callbackSuccess: Function, callbackFailure: Function, text: string){
        let token = this.connexionService.getToken(); 
        let body = {"token": token, "text": text};       
        if (text){
            this.http.post(this.miscellaneousService.configuration().common.authentificationApiBaseUrl + "encrypt", body).subscribe(
                (data: any) => callbackSuccess(data),
                (error: any) => callbackFailure(error)
            );
        }
    }
    
    public set(formGroup: any, user: any){
        for (var key in formGroup.controls){
            if (formGroup.controls[key].controls){
                for (var key1 in formGroup.controls[key].controls){
                    user[key1] = formGroup.controls[key].controls[key1].value;
                }
            }else{
                user[key] = formGroup.controls[key].value;
            }
        }
        return user;
    }

    public sendGmailEmail(callbackSuccess: Function, callbackFailure: Function, email: string, subject: string, message: string){
        if (message && email){
            let body = {"email": email, "message": message, "subject": subject};
            this.http.post(this.miscellaneousService.configuration().common.authentificationApiBaseUrl + "user/resetpassword", body).subscribe(
                (data: any) => callbackSuccess(data),
                (error: any) => callbackFailure(error)
            );
        }
    }

    public changePassword(callbackSuccess: Function, callbackFailure: Function, email: string, currentPassword: string, newPassword: string){
        if (email){
            let body = {"email": email, "currentPassword": currentPassword, "newPassword": newPassword};
            this.http.post(this.miscellaneousService.configuration().common.authentificationApiBaseUrl + "user/changepassword", body).subscribe(
                (data: any) => callbackSuccess(data),
                (error: any) => callbackFailure(error)
            );
        }
    }

    public getNewUser(){
        let date = this.toolbox.dateToDbString(new Date());
        let user: any = {};
        user.type = 0;
        user.creationdate = date;
        user.updatedate = date;
        return user;
    }
}