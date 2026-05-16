import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { LucideCheck, LucideCheckCheck, LucideSend } from '@lucide/angular';

import { ChatService } from '../../../core/services/chat.service';
import { MenuService } from '../../../core/services/menu.service';
import { MOCK_ACCOUNT } from '../../menu/mocks/account.mock';

@Component({
  selector: 'app-chat-window',
  imports: [LucideCheck, LucideCheckCheck, LucideSend],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css',
})
export class ChatWindowComponent {
  protected readonly chat = inject(ChatService);
  private readonly menu = inject(MenuService);
  protected readonly userInitial = MOCK_ACCOUNT.name.charAt(0);

  readonly backgroundUrl = signal('url(/default.jpg)');

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

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menu.isOpen()) return;
    if (!this.chat.activeConversation()) return;
    this.chat.clearActive();
  }
}
