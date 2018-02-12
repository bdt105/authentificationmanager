import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { LoginMessageComponent } from '../components/login/loginMessage.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { UserComponent } from '../components/user/user.component';

// Sidebar module
import { SidebarModule } from 'ng-sidebar';

// Bootstrap components
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
import { ConfigurationService } from '../services/configuration.service';
import { TranslateService } from '../services/translate.service';
import { ConnexionService } from '../services/connexion.service';
import { UserService } from '../services/user.service';
import { FormValidationService } from '../services/fromValidation.service';
import { AuthGuard } from '../services/auth.guard';

export function init (config: ConfigurationService) {
    config.load();
    return () => {
        return config.load(); // add return
    };
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        SidebarComponent,
        LoginComponent,
        UserComponent,
        LoginMessageComponent
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
            'deps': [ ConfigurationService ],
            'multi': true
        },
        AuthGuard, MenuService, AccordionConfig, ConfigurationService, TranslateService, 
            ConnexionService, FormValidationService, UserService],
        bootstrap: [ AppComponent ]
    })


export class AppModule { 
}