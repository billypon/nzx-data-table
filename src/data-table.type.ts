import { Observable } from 'rxjs';

export interface NzxDataTableFns<T = any> {
  load?(state: any): Observable<T[]>;
  filter?(filter: any, items: T[]): T[];
  restore?(item: T, oldItem: T): void;
  equal?(x: T, y: T): boolean;
  rowClick?(event: Event, item: T): void;
}
