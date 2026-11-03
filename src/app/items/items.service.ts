import { Injectable, signal } from '@angular/core';
import { ITEMS_MOCK, Item } from './items.mock';

export type LoadState = 'loading' | 'ready' | 'error';

// Mock service: swap the body of load() for an HttpClient call later.
@Injectable({ providedIn: 'root' })
export class ItemsService {
  readonly items = signal<Item[]>([]);
  readonly state = signal<LoadState>('loading');

  load(): void {
    this.state.set('loading');
    setTimeout(() => {
      this.items.set(ITEMS_MOCK);
      this.state.set('ready');
    }, 400);
  }
}
