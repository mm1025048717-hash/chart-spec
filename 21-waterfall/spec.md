# 瀑布图设计规范

## 图表标识
- **类型**: Waterfall Chart
- **组件**: `@antv/g2plot` - Waterfall
- **用途**: 展示数据的累计变化过程，常用于财务分析、利润分解等场景

---

## 1. 尺寸规范

### 容器尺寸
| 参数 | 值 | 说明 |
|-----|---|-----|
| 标准高度 | `400px` | 默认图表高度 |
| 容器内边距 | `20px` | chart-body padding |

### Padding 配置
```javascript
padding: [40, 24, 60, 60]  // [上, 右, 下, 左]
```

---

## 2. 瀑布图规范

| 参数 | 值 | 说明 |
|-----|---|-----|
| `xField` | string | 分类字段 |
| `yField` | string | 数值字段（正负值） |
| `risingFill` | `#5B8FF9` | 上升柱子颜色（正值） |
| `fallingFill` | `#E86452` | 下降柱子颜色（负值） |
| `columnWidthRatio` | `0.5` | 柱体宽度占比 |

```javascript
risingFill: '#5B8FF9',
fallingFill: '#E86452',
columnWidthRatio: 0.5,
waterfallStyle: { radius: [4, 4, 0, 0] },
```

---

## 3. 合计项配置

```javascript
total: {
    label: '净利润',
    style: { fill: '#86868B' },
},
```

- 当数据项 `value` 为 `null` 时，自动计算合计
- 合计柱子使用灰色 `#86868B`

---

## 4. 数据标签规范

| 参数 | 值 | 说明 |
|-----|---|-----|
| position | `middle` | 柱体中间 |
| fontSize | `11px` | 字号 |
| fill | `#fff` | 白色（柱内显示） |

```javascript
label: {
    position: 'middle',
    style: { fill: '#fff', fontSize: 11 },
    formatter: (datum) => {
        if (datum.value === null) return '';
        return datum.value > 0 ? `+${datum.value}` : datum.value;
    },
},
```

---

## 5. 坐标轴规范

### X轴配置
```javascript
xAxis: {
    label: { style: { fontSize: 11, fill: '#86868B' } },
    line: { style: { stroke: '#E8E8ED' } },
    tickLine: null,
}
```

### Y轴配置
```javascript
yAxis: {
    label: { 
        style: { fontSize: 11, fill: '#86868B' },
        formatter: (v) => v.toLocaleString(),
    },
    grid: { line: { style: { stroke: '#E8E8ED', lineDash: [4, 4] } } },
    line: null,
    tickLine: null,
}
```

---

## 6. 适用场景

### ✓ 适合
- 财务利润分解分析
- 成本构成展示
- 预算差异分析
- 数据增减变化追踪

### ✗ 不适合
- 时间序列趋势展示
- 简单数值对比
- 占比类数据
- 无累计关系的数据

---

## 7. 数据格式

```javascript
const data = [
    { type: '营业收入', value: 5200 },
    { type: '营业成本', value: -2100 },
    { type: '销售费用', value: -650 },
    { type: '管理费用', value: -380 },
    { type: '研发费用', value: -220 },
    { type: '净利润', value: null },  // null 表示自动计算合计
];
```

---

## 8. 完整配置

```javascript
const config = {
    data,
    xField: 'type',
    yField: 'value',
    padding: [40, 24, 60, 60],
    risingFill: '#5B8FF9',
    fallingFill: '#E86452',
    total: {
        label: '净利润',
        style: { fill: '#86868B' },
    },
    label: {
        position: 'middle',
        style: { fill: '#fff', fontSize: 11 },
        formatter: (datum) => {
            if (datum.value === null) return '';
            return datum.value > 0 ? `+${datum.value}` : datum.value;
        },
    },
    columnWidthRatio: 0.5,
    waterfallStyle: { radius: [4, 4, 0, 0] },
    xAxis: {
        label: { style: { fontSize: 11, fill: '#86868B' } },
        line: { style: { stroke: '#E8E8ED' } },
        tickLine: null,
    },
    yAxis: {
        label: { 
            style: { fontSize: 11, fill: '#86868B' },
            formatter: (v) => v.toLocaleString(),
        },
        grid: { line: { style: { stroke: '#E8E8ED', lineDash: [4, 4] } } },
        line: null,
        tickLine: null,
    },
    legend: false,
};
```

---

## 9. 文件结构

```
21-waterfall/
├── index.html    # 可视化展示（带标注）
└── spec.md       # 设计规范文档
```
