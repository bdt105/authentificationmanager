import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GenericComponent } from '../generic.component';

import { MenuService } from '../../services/menu.service';
import { MiscellaneousService } from '../../services/miscellaneous.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [MenuService]
})

export class HomeComponent extends GenericComponent{

    constructor(public menuService: MenuService, miscellaneousService: MiscellaneousService){
        super(miscellaneousService);
    }

    ngOnInit(){
        let t = "toto";
    }

    getApplicationTitle(){
        let menu = this.menuService.getMenu();
        if (menu){
            return menu.title;
        }
        return null;
    }

}