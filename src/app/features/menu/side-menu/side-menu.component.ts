import { Component, HostListener, inject, signal } from '@angular/core';
import {
  LucideBookmark,
  LucideChevronDown,
  LucideCircleUser,
  LucideMegaphone,
  LucideMoon,
  LucidePhone,
  LucideSettings,
  LucideUser,
  LucideUsers,
} from '@lucide/angular';

import { MenuService } from '../../../core/services/menu.service';
import { ThemeService } from '../../../core/services/theme.service';
import { MOCK_ACCOUNT } from '../mocks/account.mock';

@Component({
  selector: 'app-side-menu',
  imports: [
    LucideBookmark,
    LucideChevronDown,
    LucideCircleUser,
    LucideMegaphone,
    LucideMoon,
    LucidePhone,
    LucideSettings,
    LucideUser,
    LucideUsers,
  ],
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

  @HostListener('click', ['$event'])
  onContainerClick(event: MouseEvent): void {
    if (this.menu.isOpen() && !(event.target as HTMLElement).closest('aside')) {
      this.menu.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menu.isOpen()) {
      this.menu.close();
    }
  }
}
