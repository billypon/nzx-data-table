import { Observable } from 'rxjs';

export interface NzxDataTableOpts<T = any> {
  items?: T[];
  load?(state: any): Observable<T[]>;
  filter?(filter: any, items: T[]): T[];
  restore?(item: T, oldItem: T): void;
  equal?(x: T, y: T): boolean;
  rowClick?(event: Event, item: T): void;
}
