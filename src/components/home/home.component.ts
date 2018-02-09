import {Component, Input, Output, EventEmitter} from '@angular/core';

import { MenuService } from '../../services/menu.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [MenuService]
})

export class HomeComponent {
}