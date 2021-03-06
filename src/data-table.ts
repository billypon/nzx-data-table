import { Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { NzxDataTableOpts } from './data-table.types';

export class NzxDataTable<T = any> {
  @Input()
  get checkedName(): string {
    return this._checkedName;
  }
  set checkedName(value: string) {
    if (value) {
      this._checkedName = value.toString();
    }
  }
  private _checkedName = 'checked';

  dataItems: T[] = [];
  filteredItems: T[] = [];
  sortedItems: T[] = [];

  isLoading = true;

  pageItems: T[];
  selectedItems: T[] = [];
  currentItem?: T;

  allChecked: boolean;
  indeterminate: boolean;

  filterState: any;

  sortName?: string;
  sortValue?: string;
  sortMap: { [key: string]: any } = { };

  rowClickSkipTags = ['input', 'button'];

  constructor(protected opts: NzxDataTableOpts<T>) {
    if (opts.items !== undefined) {
      this.dataItems = opts.items;
      this.filteredItems = opts.items;
      this.sortedItems = opts.items;
    }
  }

  loadItems(state?: any): Observable<T[]> {
    const observable = new Observable<T[]>(observer => {
      const oldItems = this.dataItems || [ ];
      this.dataItems = [];
      this.filteredItems = [];
      this.sortedItems = [];
      this.pageItems = null;
      this.isLoading = true;
      this.onLoadItems(state).subscribe(items => {
        items.forEach(item => {
          const oldItem = oldItems.find(x => this.itemEqual(x, item));
          if (oldItem) {
            this.restoreState(item, oldItem);
            if (this.currentItem && this.itemEqual(oldItem, this.currentItem)) {
              this.currentItem = oldItem;
            }
          }
        });
        this.dataItems = items;
        this.filterItems(this.filterState);
        this.sortItems();
        this.isLoading = false;
        observer.next(this.dataItems);
      },
      err => observer.error(err),
      () => observer.complete());
    }).pipe(shareReplay(1));
    observable.subscribe();
    return observable;
  }

  filterItems(filter?: any, items: T[] = this.dataItems): T[] {
    this.filterState = filter;
    this.filteredItems = !filter ? items : this.onFilterItems(filter, items);
    return this.sortItems();
  }

  sortItems(sortName?: string, sortValue?: string, items: T[] = this.filteredItems): T[] {
    if (sortName && sortValue) {
      this.sortName = sortName;
      this.sortValue = sortValue;
      for (const key of Object.keys(this.sortMap)) {
        this.sortMap[key] = (key === sortName ? sortValue : null);
      }
    }
    const sortedItems = !this.sortName ? items : this.onSortItems(items);
    this.sortedItems = sortedItems.slice(0);
    return this.sortedItems;
  }

  restoreState(item: T, oldItem: T): void {
    (item as any)[this.checkedName] = (oldItem as any)[this.checkedName];
    if (this.opts.restore) {
      this.opts.restore(item, oldItem);
    }
  }

  cleanStatus(): void {
    this.selectedItems.forEach(item => (item as any)[this.checkedName] = false);
    this.selectedItems = [];
    this.currentItem = null;
    this.refreshStatus();
  }

  checkAll(value: boolean): void {
    const items = this.pageItems || this.dataItems;
    items.forEach(item => {
      if (this.onCheckItem(item)) {
        (item as any)[this.checkedName] = value;
      }
    });
    this.refreshStatus();
  }

  refreshStatus(state: { items?: T[]; selectedItems?: T[] } = { }): void {
    const items = state.items || this.pageItems || this.sortedItems;
    const selectedItems = state.selectedItems || [];
    let allChecked = !!items.length;
    let allUnChecked = true;
    items.forEach(item => {
      const checked = (item as any)[this.checkedName];
      if (checked) {
        allUnChecked = false;
        selectedItems.push(item);
      } else {
        allChecked = false;
      }
    });
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.selectedItems = selectedItems;
  }

  removeItem(item: T, items: T[] = this.dataItems): T[] {
    return items.filter(x => x !== item);
  }

  onCheckItem(item: T): boolean {
    return true;
  }

  onRowClick(event: Event, item: T): void {
    if (this.opts.rowClick) {
      this.opts.rowClick(event, item);
    } else {
      const target = event.target as HTMLElement;
      if (this.rowClickSkipTags.indexOf(target.tagName.toLowerCase()) < 0) {
        this.currentItem = item;
      }
    }
  }

  onPageChange(data: T[]): void {
    this.pageItems = data;
    this.refreshStatus();
  }

  protected itemEqual(x: T, y: T): boolean {
    return this.opts.equal ? this.opts.equal(x, y) : x === y;
  }

  protected onLoadItems(state?: any): Observable<T[]> {
    return this.opts.load ? this.opts.load(state) : of([]);
  }

  protected onFilterItems(filter: any, items: T[]): T[] {
    return this.opts.filter ? this.opts.filter(filter, items) : items;
  }

  protected onSortItems(items: T[]): T[] {
    return items.sort((x, y) => {
      return this.sortValue === 'ascend' ?
        (x[this.sortName] > y[this.sortName] ? 1 : -1) :
        (y[this.sortName] > x[this.sortName] ? 1 : -1);
    });
  }
}
