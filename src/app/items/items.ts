import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Item } from './items.mock';
import { ItemsService } from './items.service';

const ROW_HEIGHT = 32; // px, must match ::part(row) height in items.scss
const TOOLBAR_HEIGHT = 60; // px, the grid toolbar
const HEADER_HEIGHT = 56; // px, must match ::part(header) height in items.scss
const BUFFER = 10; // rows rendered above and below the viewport

interface FilterDef {
  key: keyof Item;
  label: string;
}
// Department and Supplier are shown by default; the rest sit behind "Add filter".
const FILTERS: FilterDef[] = [
  { key: 'department', label: 'Department' },
  { key: 'supplierName', label: 'Supplier' },
  { key: 'status', label: 'Status' },
  { key: 'brand', label: 'Brand' },
  { key: 'itemGroupText', label: 'Item group' },
];

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-items',
  styleUrl: './items.scss',
  templateUrl: './items.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Items {
  private readonly service = inject(ItemsService);
  protected readonly state = this.service.state;

  private readonly grid = viewChild<ElementRef<HTMLElement>>('grid');

  protected readonly columns = [
    { key: 'actions', label: 'Actions', width: '88px' }, // empty column; the row menus are laid over it
    { key: 'gtin', label: 'GTIN', width: '160px' },
    { key: 'itemText', label: 'Item text', width: '240px', type: 'link' },
    { key: 'itemNumber', label: 'Item number', width: '140px' },
    { key: 'department', label: 'Department', width: '160px' },
    { key: 'status', label: 'Status', width: '120px' },
    { key: 'brand', label: 'Brand', width: '140px' },
    { key: 'supplierNumber', label: 'Supplier number', width: '160px' },
    { key: 'itemGroupNumber', label: 'Item group number', width: '180px' },
    { key: 'supplierName', label: 'Supplier name', width: '180px' },
    { key: 'itemGroupText', label: 'Item group text', width: '200px' },
    { key: 'modifiedDate', label: 'Modified date', width: '170px' },
    { key: 'modifiedBy', label: 'Modified by', width: '180px' },
    { key: 'createdDate', label: 'Created date', width: '170px' },
    { key: 'createdBy', label: 'Created by', width: '180px' },
  ];

  protected readonly search = signal('');
  protected readonly activeFilters = signal<FilterDef[]>(FILTERS.slice(0, 2));
  protected readonly addableFilters = computed(() => FILTERS.filter((f) => !this.activeFilters().includes(f)));
  protected readonly values = signal<Partial<Record<keyof Item, string>>>({});
  // Virtual scroll window.
  private readonly scrollTop = signal(0);
  private readonly viewportHeight = signal(600);
  private readonly viewport = viewChild<ElementRef<HTMLElement>>('viewport');

  protected readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const values = this.values();
    return this.service.items().filter(
      (item) =>
        (!q || [item.gtin, item.itemText, item.itemNumber].some((v) => v.toLowerCase().includes(q))) &&
        Object.entries(values).every(([key, value]) => !value || item[key as keyof Item] === value),
    );
  });
  private readonly start = computed(() => Math.max(0, Math.floor(this.scrollTop() / ROW_HEIGHT) - BUFFER));
  protected readonly padTop = computed(() => this.start() * ROW_HEIGHT);
  protected readonly rows = computed(() => {
    const end = this.start() + Math.ceil(this.viewportHeight() / ROW_HEIGHT) + BUFFER * 2;
    this.windowEnd = Math.min(end, this.filtered().length);
    return this.filtered()
      .slice(this.start(), end)
      .map((item) => ({ id: String(item.id), values: { ...item, id: undefined } as unknown as Record<string, string> }));
  });
  private windowEnd = 0;
  protected readonly padBottom = computed(() => {
    this.rows();
    return Math.max(0, (this.filtered().length - this.windowEnd) * ROW_HEIGHT);
  });

  constructor() {
    this.service.load();
    // Back to the top whenever the result set changes.
    effect(() => {
      this.filtered();
      const el = this.viewport()?.nativeElement;
      if (el) el.scrollTop = 0;
      this.scrollTop.set(0);
      if (el) this.viewportHeight.set(el.clientHeight);
    });
    // WORKAROUND: bs-data-grid hardcodes its toolbar button order (columns, then download) and exposes no part or prop
    // for it. Reverse the toolbar's action row so download comes first, and move the search field ahead of the title block so it sits at the left. Reaches into two shadow roots; revisit if the grid adds an option.
    // WORKAROUND: bs-grid-cell sets its own height (--bs-grid-cell-height, 48px) on :host and the grid exposes no density
    // option, so ::part(row) alone cannot shrink the rows. Inject a rule into the grid's shadow root to compact them.
    effect(() => {
      const grid = this.grid()?.nativeElement as (HTMLElement & { componentOnReady?: () => Promise<unknown> }) | undefined;
      grid?.componentOnReady?.().then(() => {
        const root = grid.shadowRoot;
        if (!root || root.querySelector('style[data-compact]')) return;
        const style = document.createElement('style');
        style.dataset['compact'] = '';
        style.textContent = `bs-grid-cell { --bs-grid-cell-height: ${ROW_HEIGHT - 1}px; } .bs-data-grid__row { --bs-data-grid-row-padding-y: 0px; }`;
        root.appendChild(style);
      });
    });
    effect(() => {
      const grid = this.grid()?.nativeElement as (HTMLElement & { componentOnReady?: () => Promise<unknown> }) | undefined;
      grid?.componentOnReady?.().then(() => {
        const toolbar = grid.shadowRoot?.querySelector('bs-table-toolbar') as (HTMLElement & { componentOnReady?: () => Promise<unknown> }) | null;
        toolbar?.componentOnReady?.().then(() => {
          const actions = toolbar.shadowRoot?.querySelector<HTMLElement>('.bs-table-toolbar__actions');
          if (actions) actions.style.flexDirection = 'row-reverse';
          const search = toolbar.shadowRoot?.querySelector<HTMLElement>('.bs-table-toolbar__search');
          if (search) search.style.order = '-1';
        });
      });
    });
  }

  protected options(filter: FilterDef) {
    const distinct = [...new Set(this.service.items().map((i) => String(i[filter.key])))].filter(Boolean).sort();
    return [{ label: 'All', value: '' }, ...distinct.map((value) => ({ label: value, value }))];
  }

  protected onSearch(event: Event): void {
    this.search.set((event as CustomEvent<string>).detail ?? '');
  }

  protected setFilter(key: keyof Item, event: Event): void {
    this.values.update((v) => ({ ...v, [key]: (event as CustomEvent<string>).detail }));
  }

  protected addFilter(filter: FilterDef): void {
    this.activeFilters.update((f) => [...f, filter]);
  }

  protected readonly actionsHidden = signal(false);

  protected actionTop(index: number): number {
    return TOOLBAR_HEIGHT + HEADER_HEIGHT + this.padTop() + index * ROW_HEIGHT;
  }

  protected onColumnsChange(event: Event): void {
    this.actionsHidden.set((event as CustomEvent<{ hidden: string[] }>).detail.hidden.includes('actions'));
  }

  // Placeholders: the row menu actions have no behaviour yet.
  protected exportItem(id: string): void {}
  protected copyItem(id: string): void {}

  protected onScroll(event: Event): void {
    const el = event.target as HTMLElement;
    this.scrollTop.set(el.scrollTop);
    this.viewportHeight.set(el.clientHeight);
  }

  protected retry(): void {
    this.service.load();
  }
}
