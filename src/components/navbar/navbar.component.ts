import {Component, Input, Output, EventEmitter} from '@angular/core';

import { MenuService } from '../../services/menu.service';
import { GenericComponent } from '../generic.component';
import { ConfigurationService } from 'bdt105angularconfigurationservice';
import { TranslateLocalService } from 'bdt105angulartranslateservice';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    providers: [MenuService]
})

export class NavbarComponent extends GenericComponent {
    public connexion: any;
    public menu: any;
    public inputZone: string;
    
    @Output() clickSidebarMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor (private menuService: MenuService, public configurationService: ConfigurationService, public translateService: TranslateLocalService){
        super(configurationService, translateService);
    }
    
    toggleSidebar() {
        this.clickSidebarMenu.emit();
    }

    ngOnInit(){
        this.menuService.load('./assets/menu.json', (data: any) => this.menuLoaded(data));
    }

    private menuLoaded(data: any){
        this.menu = data;
        console.log(this.menu);
    }

    private menuLoadedFailure(data: any){
        console.log(data);
    }
}