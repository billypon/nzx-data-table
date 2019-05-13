import { Component, OnInit } from '@angular/core';

import { NzxDataTableComponent } from 'nzx-data-table';

@Component({
  selector: 'nzx-data-table-demo-basic',
  template: `
    <input nz-input (keyup)="onSearch($event)">
    <button nz-button (click)="loadItems()">刷新</button>
    <nz-table #table [nzData]="sortedItems" [nzLoading]="loadingItems" (nzCurrentPageDataChange)="onPageChange($event)">
      <thead>
        <tr>
          <th nzShowCheckbox [(nzChecked)]="allChecked" [nzIndeterminate]="indeterminate" (nzCheckedChange)="checkAll($event)"></th>
          <th nzShowSort [(nzSort)]="sortMap.id" (nzSortChange)="sortItems('id', $event)">id</th>
          <th nzShowSort [(nzSort)]="sortMap.name" (nzSortChange)="sortItems('name', $event)">name</th>
          <th nzShowSort [(nzSort)]="sortMap.age" (nzSortChange)="sortItems('age', $event)">age</th>
        </tr>
      </thead>
      <tbody>
        <tr class="cursor-hand" *ngFor="let item of table.data" [ngClass]="{'ant-table-row-selected': item == currentItem}" (click)="onRowClick($event, item)">
          <td nzShowCheckbox [(nzChecked)]="item.checked" (nzCheckedChange)="refreshStatus()"></td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles: [`
    .ant-input {
      width: auto;
    }
  `]
})

export class NzxDataTableDemoBasicComponent extends NzxDataTableComponent<Person> implements OnInit {
  ngOnInit(): void {
    this.loadItems();
  }

  onLoadItems(): Promise<Person[]> {
    return Promise.resolve([
      new Person(1, 'foo', 20),
      new Person(2, 'bar', 15)
    ]);
  }

  onFilterItems(keyword: string, items: Person[]): Person[] {
    return items.filter(item => item.name.indexOf(keyword) >= 0);
  }

  restoreState(item: Person, oldItem: Person): void {
    super.restoreState(item, oldItem);
    item.id++;
  }

  itemEqual(x: Person, y: Person): boolean {
    return x.name === y.name;
  }

  onSearch(event: Event): void {
    this.filterItems((event.target as HTMLInputElement).value);
  }
}

class Person {
  constructor(public id: number, public name: string, public age: number) {
  }
}
