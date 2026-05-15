import { Component, HostListener, inject, signal } from '@angular/core';

import { SearchService } from '../../core/services/search.service';
import { ConversationListComponent } from '../../features/chat/conversation-list/conversation-list.component';
import { ChatWindowComponent } from '../../features/chat/chat-window/chat-window.component';
import { SideMenuComponent } from '../../features/menu/side-menu/side-menu.component';
import { ResizablePanelDirective } from '../../shared/directives/resizable-panel.directive';

@Component({
  selector: 'app-main-layout',
  imports: [
    ConversationListComponent,
    ChatWindowComponent,
    SideMenuComponent,
    ResizablePanelDirective,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  private readonly search = inject(SearchService);

  protected readonly leftWidth = signal(320);

  @HostListener('document:keydown', ['$event'])
  onGlobalKey(event: KeyboardEvent): void {
    if (event.code !== 'Space') return;
    const el = document.activeElement as HTMLElement | null;
    const isTyping =
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      !!el?.isContentEditable;
    if (isTyping) return;
    event.preventDefault();
    this.search.requestFocus();
  }
}
