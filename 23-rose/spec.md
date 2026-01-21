# 玫瑰图设计规范

## 图表标识
- **类型**: Rose Chart (Nightingale Chart)
- **组件**: `@antv/g2plot` - Rose
- **用途**: 用面积表示数值大小的饼图变体，适合展示数据的大小对比与占比关系

---

## 1. 尺寸规范

### 容器尺寸
| 参数 | 值 | 说明 |
|-----|---|-----|
| 标准高度 | `400px` | 默认图表高度 |
| 紧凑高度 | `320px` | 小型玫瑰图 |
| 容器内边距 | `20px` | chart-body padding |

---

## 2. 玫瑰图规范

| 参数 | 值 | 说明 |
|-----|---|-----|
| `radius` | `0.85` | 外半径比例 |
| `xField` | string | 分类字段 |
| `yField` | string | 数值字段（决定半径长度） |
| `sectorStyle.stroke` | `#fff` | 扇形边框颜色 |
| `sectorStyle.lineWidth` | `2` | 扇形边框宽度 |

```javascript
radius: 0.85,
sectorStyle: {
    stroke: '#fff',
    lineWidth: 2,
},
```

---

## 3. 标签规范

| 参数 | 值 | 说明 |
|-----|---|-----|
| `label.offset` | `-20` | 标签偏移距离 |
| `label.style.fontSize` | `11px` | 标签字号 |
| `label.style.fill` | `#fff` | 标签颜色（白色） |

```javascript
label: {
    offset: -20,
    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    style: { fill: '#fff', fontSize: 11, fontWeight: 500 },
},
```

---

## 4. 颜色规范

```javascript
const colors = [
    '#5B8FF9',  // 蓝
    '#5AD8A6',  // 绿
    '#F6BD16',  // 黄
    '#945FB9',  // 紫
    '#E86452',  // 红
];
```

---

## 5. 常见变体

### 基础玫瑰图
```javascript
{
    data,
    xField: 'type',
    yField: 'value',
    radius: 0.85,
}
```

### 分组玫瑰图
```javascript
{
    data: groupedData,
    xField: 'type',
    yField: 'value',
    seriesField: 'year',
    isGroup: true,
}
```

### 堆叠玫瑰图
```javascript
{
    data: groupedData,
    xField: 'type',
    yField: 'value',
    seriesField: 'year',
    isStack: true,
}
```

---

## 6. 使用建议

| 建议 | 说明 |
|-----|-----|
| 数据差异 | 适合展示有明显差异的分类数据，半径差异更直观 |
| 分类数量 | 建议 4-8 个分类，过多会显得拥挤 |
| 适用场景 | 适合展示产品销量、地区分布等有明显差异的占比数据 |

---

## 7. 完整配置

```javascript
const config = {
    data,
    xField: 'type',
    yField: 'value',
    radius: 0.85,
    color: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#945FB9', '#E86452'],
    sectorStyle: {
        stroke: '#fff',
        lineWidth: 2,
    },
    label: {
        offset: -20,
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: { fill: '#fff', fontSize: 11, fontWeight: 500 },
    },
    legend: false,
    interactions: [{ type: 'element-active' }],
    tooltip: {
        formatter: (datum) => ({
            name: datum.type,
            value: `${datum.value.toLocaleString()} 万元`,
        }),
    },
};
```

---

## 8. 文件结构

```
23-rose/
├── index.html    # 可视化展示（带标注）
└── spec.md       # 设计规范文档
```
