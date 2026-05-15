import { Component, HostListener, inject, signal } from '@angular/core';

import { MenuService } from '../../../core/services/menu.service';
import { ThemeService } from '../../../core/services/theme.service';
import { MOCK_ACCOUNT } from '../mocks/account.mock';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  protected readonly menu = inject(MenuService);
  protected readonly theme = inject(ThemeService);
  protected readonly account = MOCK_ACCOUNT;

  protected readonly accountExpanded = signal(false);

  protected toggleAccount(): void {
    this.accountExpanded.update((value) => !value);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menu.isOpen()) {
      this.menu.close();
    }
  }
}
