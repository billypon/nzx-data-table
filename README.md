## 如何使用

这是一个抽象组件，无法直接使用。这是针对antd的table组件封装了很多常用操作的基础组件，使用时需要先继承该组件。

## API

### 变量

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataItems | 已加载的数据 | any[] | [] |
| filteredItems | 已筛选的数据 | any[] | [] |
| sortedItems | 已排序的数据 | any[] | [] |
| loadingItems | 是否正在加载数据 | Boolean | false |
| pageItems | 当前分页数据 | any[] | - |
| selectedItems | 选中项 | any[] | - |
| currentItem | 当前项 | any | - |
| allChecked | 全选状态 | Boolean | false |
| indeterminate | 已选且非全选状态 | Boolean | false |
| sortName | 排序字段名 | string | - |
| sortValue | 排序字段值，可选值参考 [nzSort](https://ng.ant.design/components/table/zh#th) | String | - |
| sortMap | 排序字段映射 | any | - |
| rowClickSkipTags | 行点击时忽略的标签名 | String[] | ['input', 'button'] |

### 方法

| 名称 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| loadItems | 加载数据 | (state?: any) | Promise<any[]> |
| filterItems | 筛选数据 | (filter?: any, items?: any[]) | any[] |
| sortItems | 排序数据 | (sortName: String, sortValue: String, items?: any[]) | any[] |
| restoreState | 还原数据状态 | (item: any, oldItem: any) | - |
| cleanStatus | 清除选中状态 | - | - |
| checkAll | 全选 | (value: Boolean) | - |
| refreshStatus | 刷新选中状态 | (state?: any) | - |
| itemEqual | 判断元素是否相等 | (x: any, y: any) | Boolean |
| removeItem | 移除数据 | (item: T, items?: any[]) | any[] |

* `loadItems`: state 会传递给 `onLoadItems`，加载结果会保存在 `dataItems/filteredItems/sortedItems`，会自动设置加载状态及还原选中/筛选/排序状态
* `filterItems`: items 默认值为 `dataItems`，筛选结果会保存在 `filteredItems`，筛选条件会保存在 `filterState`，排序完成后会自动执行排序
* `sortItems`: items 默认值为 `filteredItems`，排序结果会保存在 `sortedItems`
* `restoreState`: 默认会还原选中状态
* `cleanStatus`: 默认会清除 `selectedItems/currentItem`，刷新选中状态
* `refreshStatus`: state 类型为 `items?: any[], selectedItems?: any[]`，`items` 默认值为 `pageItems/sortedItems`，`selectedItems` 默认值为 []
* `removeItem`: items 默认值为 `dataItems`

### 回调

| 名称 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| onLoadItems | 加载数据 | (state?: any) | Promise<any[]> |
| onFilterItems | 筛选数据 | (filter: any, items: any) | any[] |
| onSortItems | 排序数据 | (items: any[]) | any[] |
| onCheckItem | 选中元素 | (item: any) | boolean |

### 事件

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| onRowClick | 行点击 | (event: Event, item: any) |
| onPageChange | 页码变化 | (data: any[]) |

### DataTableFns

独立使用 `DataTable` 时，构造函数的参数为 `DataTableFns`，包含以下字段，所有字段可选。通过传递不通的字段，可以覆盖 `DataTable` 对应的函数。

| 名称 | 对应 |
| --- | --- |
| load | onLoadItems |
| filter | onFilterItems |
| restore | restoreState |
| equal | itemEqual |
| rowClick | onRowClick |

* `restore`: 会先自动调用 `DataTable` 原始的方法
