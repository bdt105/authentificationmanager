import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { UserResetPasswordComponent } from '../components/user/userResetPassword.component';
import { UserChangePasswordComponent } from '../components/user/userChangePassword.component';

// Sidebar module https://github.com/arkon/ng-sidebar
import { SidebarModule } from 'ng-sidebar';

// Bootstrap components https://valor-software.com/ngx-bootstrap
import { AccordionModule, AccordionConfig } from 'ngx-bootstrap';
import { TabsModule, AlertModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

// App
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Services
import { MenuService } from '../services/menu.service';
import { ConnexionService, ConnexionTokenService } from 'bdt105angularconnexionservice';
import { DatabaseService } from 'bdt105angulardatabaseservice';
import { ConfigurationService } from 'bdt105angularconfigurationservice';
import { UserService } from '../services/user.service';
import { FormValidationService } from '../services/formValidation.service';
import { AuthGuard } from '../services/auth.guard';
import { MiscellaneousService } from '../services/miscellaneous.service';

export function init(configurationService: ConfigurationService) {
    return () => {
        configurationService.load("translateAuthentification", "./assets/translateFR.json", false);
        configurationService.load("configurationAuthentification", "./assets/configuration.json", false);
    }
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
        AboutComponent,
        UserResetPasswordComponent,
        UserChangePasswordComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AccordionModule,
        HttpModule,
        ReactiveFormsModule,
        AlertModule.forRoot(),
        SidebarModule.forRoot()
    ],
    providers: [
        {
            'provide': APP_INITIALIZER,
            'useFactory': init,
            'deps': [ConfigurationService],
            'multi': true
        },
        AuthGuard, MenuService, AccordionConfig, ConfigurationService, MiscellaneousService, FormValidationService,
        ConnexionService, UserService, DatabaseService, ConnexionTokenService],
    bootstrap: [AppComponent]
})


export class AppModule {
}