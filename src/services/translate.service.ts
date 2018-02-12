import { Injectable } from '@angular/core';
import { Toolbox } from 'bdt105toolbox/dist';
import { Http } from '@angular/http';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class TranslateService {

    private toolbox: Toolbox = new Toolbox(); 
    private translateData : any; 
    private currentText: string;
    private language: string;
    private baseurl: string;
    private storageKey = "translate";

    constructor(private configurationService: ConfigurationService, private http: Http){
        this.language = this.configurationService.get().common.language;
        this.init();
        
    }

    public translate (text: string){
        this.currentText = text;
        this.translateData = this.toolbox.readFromStorage(this.storageKey);
        if (this.translateData){
            let t = this.toolbox.filterArrayOfObjects(this.translateData, "key", text);
            if (t && t.length > 0){ 
                return t[0].value;
            }
        }
        return text;
    }

    private init (){
        
        this.http.get(this.url).subscribe(
            (data: any) => this.manageData(data),
            (error: any) => this.manageError(error)
        );
    }

    private manageData (data: any){
        this.toolbox.log(data);
        this.translateData = this.toolbox.parseJson(data._body);
        this.toolbox.writeToStorage(this.storageKey, this.translateData, false);
    };

    private manageError (error: any){
        console.log(error);
    };
}