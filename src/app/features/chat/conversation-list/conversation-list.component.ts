import { Component, inject } from '@angular/core';

import { ChatService } from '../../../core/services/chat.service';
import { IconMenu } from '../../../shared/components/icon-menu/icon-menu.component';

@Component({
  selector: 'app-conversation-list',
  imports: [IconMenu],
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.css',
})
export class ConversationListComponent {
  protected readonly chat = inject(ChatService);
}
