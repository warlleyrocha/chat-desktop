import { Component, signal } from '@angular/core';

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
  protected readonly leftWidth = signal(320);
}
