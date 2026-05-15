import { Component, computed, inject } from '@angular/core';

import { ChatService } from '../../../core/services/chat.service';
import { MOCK_ACCOUNT } from '../../menu/mocks/account.mock';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css',
})
export class ChatWindowComponent {
  protected readonly chat = inject(ChatService);
  protected readonly userInitial = MOCK_ACCOUNT.name.charAt(0);

  protected readonly groupedMessages = computed(() => {
    const messages = this.chat.activeMessages();
    return messages.map((message, index) => {
      const prev = messages[index - 1];
      const next = messages[index + 1];
      return {
        ...message,
        isFirstInGroup: prev?.mine !== message.mine,
        isLastInGroup: next?.mine !== message.mine,
      };
    });
  });

  protected send(input: HTMLInputElement): void {
    this.chat.sendMessage(input.value);
    input.value = '';
  }
}
