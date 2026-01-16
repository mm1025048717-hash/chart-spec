# 堆叠柱状图设计规范

## 图表标识
- **类型**: Stacked Column Chart
- **组件**: `@ant-design/charts` - Column (isStack: true)
- **用途**: 展示各部分数值的堆叠构成

---

## 1. 适用场景

| 场景 | 示例 |
|-----|------|
| 构成分析 | 各渠道销售额构成 |
| 累计展示 | 季度累计收入 |
| 成本分解 | 各类成本占比 |
| 多维对比 | 不同地区产品构成 |

### 与分组柱状图的选择
- **堆叠**: 强调总量和构成
- **分组**: 强调各系列对比

---

## 2. 核心配置

```javascript
const config = {
    data,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    isStack: true,           // 关键配置
    color: ['#5B8FF9', '#5AD8A6'],
    columnWidthRatio: 0.5,
};
```

---

## 3. 变体类型

### 普通堆叠
```javascript
isStack: true
```

### 百分比堆叠
```javascript
isStack: true,
isPercent: true,
yAxis: {
    label: { formatter: (v) => (v * 100).toFixed(0) + '%' },
}
```

---

## 4. 颜色规范

```javascript
const colors = [
    '#5B8FF9',  // 系列1
    '#5AD8A6',  // 系列2
    '#F6BD16',  // 系列3
    '#E86452',  // 系列4
    '#9270CA',  // 系列5
];
```

---

## 5. 图例配置

```javascript
legend: {
    position: 'top-right',
    itemSpacing: 16,
}
```

---

## 6. 文件结构

```
02-stacked-column/
├── index.html
└── spec.md
```
