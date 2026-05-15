import { Injectable, computed, signal } from '@angular/core';

import { Conversation } from '../../shared/models/conversation.model';
import { Message } from '../../shared/models/message.model';
import { MOCK_CONVERSATIONS } from '../../features/chat/mocks/conversations.mock';
import { MOCK_MESSAGES } from '../../features/chat/mocks/messages.mock';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly _conversations = signal<Conversation[]>(MOCK_CONVERSATIONS);
  private readonly _messages = signal<Message[]>(MOCK_MESSAGES);
  private readonly _activeConversationId = signal<string | null>(MOCK_CONVERSATIONS[0]?.id ?? null);

  readonly conversations = this._conversations.asReadonly();
  readonly activeConversationId = this._activeConversationId.asReadonly();

  readonly hasConversations = computed(() => this._conversations().length > 0);

  readonly activeConversation = computed(() => {
    const id = this._activeConversationId();
    return this._conversations().find((c) => c.id === id) ?? null;
  });

  readonly activeMessages = computed(() => {
    const id = this._activeConversationId();
    if (!id) {
      return [] as Message[];
    }
    return this._messages().filter((m) => m.conversationId === id);
  });

  selectConversation(id: string): void {
    this._activeConversationId.set(id);
    this._conversations.update((list) => list.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  }

  sendMessage(text: string): void {
    const conversationId = this._activeConversationId();
    const trimmed = text.trim();
    if (!conversationId || !trimmed) {
      return;
    }

    const time = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const message: Message = {
      id: `m-${Date.now()}`,
      conversationId,
      author: 'Voce',
      text: trimmed,
      time,
      mine: true,
    };

    this._messages.update((list) => [...list, message]);
    this._conversations.update((list) =>
      list.map((c) => (c.id === conversationId ? { ...c, lastMessage: trimmed, time } : c)),
    );
  }
}
