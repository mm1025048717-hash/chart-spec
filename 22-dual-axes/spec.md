# 双轴图设计规范

## 图表标识
- **类型**: Dual Axes Chart
- **组件**: `@antv/g2plot` - DualAxes
- **用途**: 在同一图表中展示两种不同度量的数据，便于对比分析相关指标

---

## 1. 尺寸规范

### 容器尺寸
| 参数 | 值 | 说明 |
|-----|---|-----|
| 标准高度 | `400px` | 默认图表高度 |
| 容器内边距 | `20px` | chart-body padding |

### Padding 配置
```javascript
padding: [40, 50, 60, 60]  // [上, 右, 下, 左]
```

| 位置 | 值 | 用途 |
|-----|---|-----|
| 上 | `40px` | 图例区域 |
| 右 | `50px` | 右侧Y轴标签 |
| 下 | `60px` | X轴标签区域 |
| 左 | `60px` | 左侧Y轴标签 |

---

## 2. 双轴图规范

| 参数 | 值 | 说明 |
|-----|---|-----|
| `yField` | `['value', 'rate']` | 双Y轴字段数组 |
| `geometryOptions[0]` | column | 第一个几何图形（柱状图） |
| `geometryOptions[1]` | line | 第二个几何图形（折线图） |

---

## 3. 几何图形配置

### 柱状图配置
```javascript
{
    geometry: 'column',
    color: '#5B8FF9',
    columnWidthRatio: 0.4,
    columnStyle: { radius: [4, 4, 0, 0] },
}
```

### 折线图配置
```javascript
{
    geometry: 'line',
    color: '#5AD8A6',
    lineStyle: { lineWidth: 2 },
    point: {
        size: 4,
        style: { fill: '#fff', stroke: '#5AD8A6', lineWidth: 2 },
    },
}
```

---

## 4. 双Y轴配置

```javascript
yAxis: {
    value: {
        label: {
            style: { fontSize: 11, fill: '#86868B' },
            formatter: (v) => v.toLocaleString(),
        },
        grid: { line: { style: { stroke: '#E8E8ED', lineDash: [4, 4] } } },
        line: null,
        tickLine: null,
    },
    rate: {
        label: {
            style: { fontSize: 11, fill: '#86868B' },
            formatter: (v) => `${v}%`,
        },
        line: null,
        tickLine: null,
        grid: null,  // 右侧Y轴不显示网格线
    },
},
```

---

## 5. 常见变体

### 柱状图 + 折线图
- 最常用的组合
- 柱状图展示绝对值，折线图展示趋势或比率

### 堆叠柱 + 折线
```javascript
geometryOptions: [
    {
        geometry: 'column',
        isStack: true,
        seriesField: 'type',
        color: ['#5B8FF9', '#5AD8A6'],
    },
    {
        geometry: 'line',
        color: '#F6BD16',
    },
],
```

### 双折线图
```javascript
geometryOptions: [
    {
        geometry: 'line',
        color: '#5B8FF9',
        smooth: true,
    },
    {
        geometry: 'line',
        color: '#E86452',
        smooth: true,
        lineStyle: { lineDash: [4, 4] },  // 虚线区分
    },
],
```

---

## 6. 使用建议

| 建议 | 说明 |
|-----|-----|
| 数据单位 | 两个Y轴应有不同的单位或量级，避免混淆 |
| 颜色区分 | 建议使用不同颜色区分两个系列，增强可读性 |
| 图例配置 | 建议显示图例，帮助用户理解两个系列的含义 |
| 适用场景 | 适合展示销售额与转化率、数量与百分比等关联指标 |

---

## 7. 完整配置

```javascript
const config = {
    data: [columnData, lineData],
    xField: 'month',
    yField: ['value', 'rate'],
    padding: [40, 50, 60, 60],
    geometryOptions: [
        {
            geometry: 'column',
            color: '#5B8FF9',
            columnWidthRatio: 0.4,
            columnStyle: { radius: [4, 4, 0, 0] },
        },
        {
            geometry: 'line',
            color: '#5AD8A6',
            lineStyle: { lineWidth: 2 },
            point: { size: 4, style: { fill: '#fff', stroke: '#5AD8A6', lineWidth: 2 } },
        },
    ],
    xAxis: {
        label: { style: { fontSize: 11, fill: '#86868B' } },
        line: { style: { stroke: '#E8E8ED' } },
        tickLine: null,
    },
    yAxis: {
        value: {
            label: { style: { fontSize: 11, fill: '#86868B' }, formatter: (v) => v.toLocaleString() },
            grid: { line: { style: { stroke: '#E8E8ED', lineDash: [4, 4] } } },
            line: null,
            tickLine: null,
        },
        rate: {
            label: { style: { fontSize: 11, fill: '#86868B' }, formatter: (v) => `${v}%` },
            line: null,
            tickLine: null,
            grid: null,
        },
    },
    legend: false,
};
```

---

## 8. 文件结构

```
22-dual-axes/
├── index.html    # 可视化展示（带标注）
└── spec.md       # 设计规范文档
```
