import { Component, inject } from '@angular/core';

import { MenuService } from '../../../core/services/menu.service';

@Component({
  selector: 'app-icon-menu',
  templateUrl: './icon-menu.component.html',
  styleUrl: './icon-menu.component.css',
})
export class IconMenu {
  protected readonly menu = inject(MenuService);
}
