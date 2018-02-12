import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericComponent } from '../../components/generic.component';
import { TranslateService } from '../../services/translate.service';
import { ConfigurationService } from '../../services/configuration.service';
import { ConnexionService } from '../../services/connexion.service';

@Component({
    selector: 'loginMessage',
    templateUrl: './loginMessage.component.html',
    providers: []
})

export class LoginMessageComponent extends GenericComponent{
    public isConnected = false;
    public connected: any;

    constructor (public configurationService: ConfigurationService, public translateService: TranslateService, public connexionService: ConnexionService) {
        super(configurationService, translateService);
        this.refresh();
    }  

    public refresh(){
        this.isConnected = this.connexionService.isConnected();
        if (this.isConnected){
            this.connected = this.connexionService.get().decoded;
        }
    }
    
    disconnect(){
        this.connexionService.disconnect();
        this.refresh();
    }
}