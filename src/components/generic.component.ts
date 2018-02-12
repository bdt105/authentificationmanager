import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '../services/translate.service';
import { ConfigurationService } from '../services/configuration.service';

export class GenericComponent implements OnInit{

    constructor(public configurationService: ConfigurationService, public translateService: TranslateService){
    }

    ngOnInit(){
    }

    translate(text: string){
        return this.translateService.translate(text);
    }    
}