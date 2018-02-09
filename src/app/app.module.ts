import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HomeComponent } from '../components/home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

// Sidebar module
import { SidebarModule } from '../../node_modules/ng-sidebar';

// Bootstrap components
import { AccordionModule, AccordionConfig } from '../../node_modules/ngx-bootstrap';
import { TabsModule } from '../../node_modules/ngx-bootstrap';
import { TypeaheadModule } from '../../node_modules/ngx-bootstrap';
import { PaginationModule } from '../../node_modules/ngx-bootstrap';
import { ModalModule } from '../../node_modules/ngx-bootstrap';

// App
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Services
import { MenuService } from '../services/menu.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AccordionModule,
    HttpModule,
    SidebarModule.forRoot()
  ],
  providers: [MenuService, AccordionConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
