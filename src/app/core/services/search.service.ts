import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SearchService {
  readonly focusRequest = signal(0);

  requestFocus(): void {
    this.focusRequest.update((n) => n + 1);
  }
}
