import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GenericComponent } from '../generic.component';

import { MenuService } from '../../services/menu.service';
import { TranslateLocalService } from 'bdt105angulartranslateservice';
import { ConfigurationService } from 'bdt105angularconfigurationservice';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [MenuService]
})

export class HomeComponent extends GenericComponent{

    constructor(public configurationService: ConfigurationService, 
        public translateService: TranslateLocalService,
        public menuService: MenuService){
        super(configurationService, translateService);
    }


    ngOnInit(){
        
    }

    getApplicationTitle(){
        let menu = this.menuService.getMenu();
        if (menu){
            return menu.title;
        }
        return null;
    }

}