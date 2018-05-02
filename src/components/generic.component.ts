import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { TranslateLocalService } from 'bdt105angulartranslateservice';
import { ConfigurationService } from 'bdt105angularconfigurationservice';

export class GenericComponent implements OnInit{

    // public canDisplay: boolean = false;
    
    // private canDisplaySuccess(data: any){
    //     this.canDisplay = (data != null);
    // }

    // private canDisplayFailure(data: any){
    //     this.canDisplay = false;
    // }

    constructor(public configurationService: ConfigurationService, public translateService: TranslateLocalService){

    }

    ngOnInit(){

    }


    loadTranslation(){

    }

    translate(text: string){
        return this.translateService.translate(text);
    }    
}