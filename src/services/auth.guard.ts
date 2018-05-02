import { Injectable } from "@angular/core";

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Toolbox } from "bdt105toolbox/dist";

import { ConfigurationService } from 'bdt105angularconfigurationservice';
import { TranslateLocalService } from 'bdt105angulartranslateservice';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';

@Injectable()
export class AuthGuard implements CanActivate{

    private toolbox: Toolbox = new Toolbox();
    
    constructor(private router: Router, private configurationService: ConfigurationService, public connexionService: ConnexionTokenService){

    }

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let conn = this.connexionService.isConnected();
        if (!conn){
            this.toolbox.writeToStorage("redirectUrl", state.url, true);
            let url = this.toolbox.readFromStorage("redirectUrl");
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

}