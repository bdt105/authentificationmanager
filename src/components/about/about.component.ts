import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GenericComponent } from '../generic.component';

import { TranslateLocalService } from 'bdt105angulartranslateservice';
import { ConfigurationService } from 'bdt105angularconfigurationservice';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    providers: []
})

export class AboutComponent extends GenericComponent{

    constructor(public configurationService: ConfigurationService, 
        public translateService: TranslateLocalService){
        super(configurationService, translateService);
    }


    ngOnInit(){
        
    }


}