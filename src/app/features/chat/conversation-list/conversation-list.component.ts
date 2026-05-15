import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';

import { ChatService } from '../../../core/services/chat.service';
import { SearchService } from '../../../core/services/search.service';
import { IconMenu } from '../../../shared/components/icon-menu/icon-menu.component';

@Component({
  selector: 'app-conversation-list',
  imports: [IconMenu],
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.css',
  host: { tabindex: '0' },
})
export class ConversationListComponent {
  protected readonly chat = inject(ChatService);
  private readonly search = inject(SearchService);

  protected readonly highlightedIndex = signal<number | null>(null);

  @ViewChild('searchInput')
  private readonly searchInput?: ElementRef<HTMLInputElement>;

  constructor() {
    effect(() => {
      const count = this.chat.conversations().length;
      const current = this.highlightedIndex();
      if (current === null) return;
      if (count === 0) {
        this.highlightedIndex.set(null);
      } else if (current >= count) {
        this.highlightedIndex.set(count - 1);
      }
    });

    let firstRun = true;
    effect(() => {
      this.search.focusRequest();
      if (firstRun) {
        firstRun = false;
        return;
      }
      queueMicrotask(() => this.searchInput?.nativeElement.focus());
    });
  }

  @HostListener('document:keydown.escape')
  onDocumentEscape(): void {
    if (this.highlightedIndex() !== null) {
      this.highlightedIndex.set(null);
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const el = document.activeElement as HTMLElement | null;
    const isTyping =
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      !!el?.isContentEditable;
    if (isTyping) return;
    const list = this.chat.conversations();
    if (!list.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.highlightedIndex.update((i) =>
        i === null ? 0 : Math.min(i + 1, list.length - 1),
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.highlightedIndex.update((i) => (i === null ? 0 : Math.max(i - 1, 0)));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const idx = this.highlightedIndex();
      if (idx === null) return;
      const item = list[idx];
      if (item) this.chat.selectConversation(item.id);
    }
  }

  protected onItemClick(id: string): void {
    this.highlightedIndex.set(null);
    this.chat.selectConversation(id);
  }

  protected onSearchEscape(event: Event, input: HTMLInputElement): void {
    event.stopPropagation();
    input.value = '';
    input.blur();
  }
}
