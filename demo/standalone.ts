import { Component, OnInit } from '@angular/core';

import { NzxDataTableCore } from 'nzx-data-table';

@Component({
  selector: 'nzx-data-table-demo-standalone',
  template: `
    <input nz-input (keyup)="onSearch($event)">
    <button nz-button (click)="dataTable.loadItems()">刷新</button>
    <nz-table #table [nzData]="dataTable.sortedItems" [nzLoading]="dataTable.loadingItems" (nzCurrentPageDataChange)="dataTable.onPageChange($event)">
      <thead>
        <tr>
          <th nzShowCheckbox [(nzChecked)]="dataTable.allChecked" [nzIndeterminate]="dataTable.indeterminate" (nzCheckedChange)="dataTable.checkAll($event)"></th>
          <th nzShowSort [(nzSort)]="dataTable.sortMap.id" (nzSortChange)="dataTable.sortItems('id', $event)">id</th>
          <th nzShowSort [(nzSort)]="dataTable.sortMap.name" (nzSortChange)="dataTable.sortItems('name', $event)">name</th>
          <th nzShowSort [(nzSort)]="dataTable.sortMap.age" (nzSortChange)="dataTable.sortItems('age', $event)">age</th>
        </tr>
      </thead>
      <tbody>
        <tr class="cursor-hand" *ngFor="let item of table.data" [ngClass]="{'ant-table-row-selected': item == dataTable.currentItem}" (click)="dataTable.onRowClick($event, item)">
          <td nzShowCheckbox [(nzChecked)]="item.checked" (nzCheckedChange)="dataTable.refreshStatus()"></td>
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

export class NzxDataTableDemoStandaloneComponent implements OnInit {
  dataTable: NzxDataTableCore<Person>;

  constructor() {
    this.dataTable = new NzxDataTableCore({
      load: () => Promise.resolve([
        new Person(1, 'foo', 20),
        new Person(2, 'bar', 15)
      ]),
      filter: (keyword: string, items: Person[]) => items.filter(item => item.name.indexOf(keyword) >= 0),
      restore: (item: Person, oldItem: Person) => item.id++,
      equal: (x: Person, y: Person) => x.name === y.name
    });
  }

  ngOnInit(): void {
    this.dataTable.loadItems();
  }

  onSearch(event: Event): void {
    this.dataTable.filterItems((event.target as HTMLInputElement).value);
  }
}

class Person {
  constructor(public id: number, public name: string, public age: number) {
  }
}
