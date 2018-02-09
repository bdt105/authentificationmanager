import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    sidebarOpened = false;
    
    title = 'app';
    
    toggleSidebar(event: any) {
		this.sidebarOpened = !this.sidebarOpened;
	}
}
