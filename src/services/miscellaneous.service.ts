import { Injectable } from '@angular/core';
import { Toolbox } from 'bdt105toolbox/dist';

import { interval } from 'rxjs/observable/interval';
import { timer } from 'rxjs/observable/timer';
import { takeUntil } from 'rxjs/operators';


@Injectable()
export class MiscellaneousService {

    timer: any;
    private toolbox: Toolbox = new Toolbox(); 
    private translateData : any; 
    private currentText: string;
    private language = "FR";
    private url = './assets/translate' + this.language + '.json';
    private configurationKey = "configurationAuthentification";
    private translateKey = "translateAuthentification";

    constructor(){
    }

    private get(storageKey: string, waitingTime: number){
        let obj = this.toolbox.readFromStorage(storageKey);
        return obj;
    }

    configuration(){
        return this.get(this.configurationKey, 3000);
    }

    translate(text: string){
        let translateData = this.get(this.translateKey, 3000);
        if (translateData){
            let t = this.toolbox.filterArrayOfObjects(translateData, "key", text);
            if (t && t.length > 0){ 
                return t[0].value;
            }
        }
        return text;
    } 
}
