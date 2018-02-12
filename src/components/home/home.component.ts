import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GenericComponent } from '../generic.component';

import { MenuService } from '../../services/menu.service';
import { ConfigurationService } from '../../services/configuration.service';
import { TranslateService } from '../../services/translate.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [MenuService]
})

export class HomeComponent extends GenericComponent{

    constructor(public configurationService: ConfigurationService, public translateService: TranslateService){
        super(configurationService, translateService);
    }


    ngOnInit(){
        
    }

}