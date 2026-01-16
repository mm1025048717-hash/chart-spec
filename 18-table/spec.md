# 表格设计规范

## 组件标识
- **类型**: Table
- **组件**: Ant Design - Table
- **用途**: 结构化数据展示

## 核心配置

```javascript
import { Table } from 'antd';

const columns = [
    { title: '列名', dataIndex: 'field', key: 'field' },
    {
        title: '金额',
        dataIndex: 'amount',
        render: (val) => `¥ ${val.toLocaleString()}`,
        sorter: (a, b) => a.amount - b.amount,
    },
];

<Table columns={columns} dataSource={data} />
```

## 样式规范

| 元素 | 值 |
|-----|---|
| 表头背景 | #FAFAFA |
| 边框色 | #E8E8E8 |
| 悬停背景 | #F5F5F5 |
| 单元格内边距 | 12px 16px |

## 常用功能
- 排序：sorter 属性
- 筛选：filters 属性
- 分页：pagination 属性
