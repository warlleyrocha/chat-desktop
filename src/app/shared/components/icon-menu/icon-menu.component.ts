import { Component, inject } from '@angular/core';
import { LucideMenu } from '@lucide/angular';

import { MenuService } from '../../../core/services/menu.service';

@Component({
  selector: 'app-icon-menu',
  imports: [LucideMenu],
  templateUrl: './icon-menu.component.html',
})
export class IconMenu {
  protected readonly menu = inject(MenuService);
}
