import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components
import { HomeComponent } from '../components/home/home.component';
import { AboutComponent } from '../components/about/about.component';
import { LoginnnComponent } from '../components/login/loginnn.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { UserCompleteComponent } from '../components/user/userComplete.component';
import { UserCreateComponent } from '../components/user/userCreate.component';

// Sidebar module https://github.com/arkon/ng-sidebar
import { SidebarModule } from 'ng-sidebar';

// Bootstrap components https://valor-software.com/ngx-bootstrap
import { AccordionModule, AccordionConfig } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

// App
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Services
import { MenuService } from '../services/menu.service';
import { ConnexionService, ConnexionTokenService } from 'bdt105angularconnexionservice';
import { TranslateLocalService } from 'bdt105angulartranslateservice';
import { DatabaseService } from 'bdt105angulardatabaseservice';
import { ConfigurationService } from 'bdt105angularconfigurationservice';
import { UserService } from '../services/user.service';
import { FormValidationService } from '../services/fromValidation.service';
import { AuthGuard } from '../services/auth.guard';

export function init (config: ConfigurationService, trans: TranslateLocalService) {
    let callback1 = ()=>{
        trans.language = config.get().common.language;
        let callbackTrans1 = ()=>{

        }
        let callbackTrans0 = ()=>{
            
        }
        trans.init(callbackTrans1, callbackTrans0);
    }
    let callback0 = ()=>{
        console.log("Error loading configuration !");
    }
    config.init(callback1, callback0);
    return () => {
        return config.load(); // Waits for 2 second that everything gets loaded
    };
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        SidebarComponent,
        LoginnnComponent,
        UserCreateComponent,
        UserCompleteComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AccordionModule,
        HttpModule,
        ReactiveFormsModule,
        SidebarModule.forRoot()
    ],
    providers: [
        {
            'provide': APP_INITIALIZER,
            'useFactory': init,
            'deps': [ ConfigurationService, TranslateLocalService ],
            'multi': true
        },
        AuthGuard, MenuService, AccordionConfig, ConfigurationService, TranslateLocalService, 
            ConnexionService, FormValidationService, UserService, DatabaseService, ConnexionTokenService],
        bootstrap: [ AppComponent ]
    })


export class AppModule { 
}