import { Component } from '@angular/core';
import { TranslateLocalService } from 'bdt105angulartranslateservice';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public sidebarOpened = false;

    constructor(private translateService: TranslateLocalService, private connexionService: ConnexionTokenService){

    }
    
    title = 'app';
    
    public toggleSidebar(event: any) {
		this.sidebarOpened = !this.sidebarOpened;
    }
    
    public translate(text: string){
        return this.translateService.translate(text);
    }

    public getCurrentUser(){
        let usr = this.connexionService.getUser();
        return usr;
    }

    public isConnected(){
        return this.connexionService.isConnected();
    }
}
