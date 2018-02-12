import { Injectable } from "@angular/core";

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
//import { Observable } from "rxjs/Observable";
// import { ConnexionService } from 'bdt105angularconnexionservice';
import { Toolbox } from "bdt105toolbox/dist";

@Injectable()

export class AuthGuard implements CanActivate{

    private toolbox: Toolbox = new Toolbox();
    
    constructor(private router: Router/*, private connexionService: ConnexionService*/){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // let conn = this.connexionService.getConnexion();
        // if (!conn || !conn.currentUser){
        //     this.toolbox.writeToStorage("redirectUrl", state.url, true);
        //     let url = this.toolbox.readFromStorage("redirectUrl");
        //     this.router.navigate(['/login']);
        //     return false;
        // }
        return true;
    }

}