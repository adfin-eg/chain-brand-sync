import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NAV_MODULES, NavModule } from './nav/nav.mock';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly query = signal('');
  // Menu filtered by the search field: keeps pages whose name matches, plus their section and module.
  // A module whose own name matches keeps all its pages.
  protected readonly modules = computed<NavModule[]>(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return NAV_MODULES;
    const hit = (text: string) => text.toLowerCase().includes(q);
    return NAV_MODULES.flatMap((module) => {
      if (hit(module.label)) return [module];
      const sections = module.sections
        .map((section) => ({ ...section, pages: section.pages.filter(hit) }))
        .filter((section) => section.pages.length > 0);
      return sections.length ? [{ ...module, sections }] : [];
    });
  });
  // Selected page, keyed "module/section/page" because page names repeat (e.g. "System parameters").
  protected readonly selected = signal({ key: 'Home', title: 'Home' });

  protected search(event: Event): void {
    this.query.set((event as CustomEvent<string>).detail);
  }

  protected select(key: string, title: string): void {
    this.selected.set({ key, title });
  }
}
