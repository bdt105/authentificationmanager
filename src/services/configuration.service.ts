import { Injectable } from '@angular/core';
import { Toolbox } from 'bdt105toolbox/dist';
import { Http } from '@angular/http';

@Injectable()
export class ConfigurationService {

    private toolbox: Toolbox = new Toolbox(); 
    private data : any; 
    private url = './assets/configuration.json';
    private storageKey = "configuration";

    constructor(private http: Http){
        this.init();
    }

    public get(){
        this.data = this.toolbox.readFromStorage(this.storageKey);
        if (this.data){
            return this.data; 
        }
        return null;
    }

    private init (){
        this.http.get(this.url).subscribe(
            (data: any) => this.manageData(data),
            (error: any) => this.manageError(error)
        );
    }

    private manageData (data: any){
        this.toolbox.log(data);
        this.data = this.toolbox.parseJson(data._body);
        this.toolbox.writeToStorage(this.storageKey, this.data, false);
    };

    private manageError (error: any){
        console.log(error);
    };
}