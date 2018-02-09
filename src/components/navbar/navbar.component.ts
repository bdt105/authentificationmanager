import {Component, Input, Output, EventEmitter} from '@angular/core';

import { MenuService } from '../../services/menu.service';
import { GenericComponent } from '../generic.component';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    providers: [MenuService]
})

export class NavbarComponent extends GenericComponent {
    connexion: any;
    menu: any;
    inputZone: string;
    
    @Output() clickSidebarMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor (private menuService: MenuService){
        super();
    }
    
    toggleSidebar() {
        this.clickSidebarMenu.emit();
    }

    ngOnInit(){
        this.menuService.load('./assets/menu.json', (data: any) => this.menuLoaded(data));
    }

    private menuLoadedMain(data: any){
        this.menu.navbarMenu = data.concat(this.menu.navbarMenu);
    }

    private menuLoaded(data: any){
        this.menu = data;
    }

    private menuLoadedFailure(data: any){
        console.log(data);
    }
}