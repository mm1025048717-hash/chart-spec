# 条形图设计规范

## 图表标识
- **类型**: Bar Chart
- **组件**: `@ant-design/charts` - Bar
- **用途**: 水平方向的柱状图，特别适合展示长标签的分类数据和排行榜

---

## 1. 尺寸规范

### 容器尺寸
| 参数 | 值 | 说明 |
|-----|---|-----|
| 标准高度 | `500px` | 条形图通常需要更高的容器 |
| 紧凑高度 | `400px` | 项数较少时 |
| 容器内边距 | `20px` | chart-body padding |

### Padding 配置
```javascript
padding: [30, 50, 40, 200]  // [上, 右, 下, 左]
```

| 位置 | 值 | 用途 |
|-----|---|-----|
| 上 | `30px` | 顶部留白 |
| 右 | `50px` | 数据标签区域 |
| 下 | `40px` | X轴标签区域 |
| 左 | `200px` | Y轴长标签区域 |

---

## 2. 坐标轴规范

### X轴配置（数值轴）
```javascript
xAxis: {
    label: {
        style: { fontSize: 11, fill: '#86868B' },
        formatter: (v) => (v / 1000).toFixed(0) + 'k',
    },
    grid: {
        line: { style: { stroke: '#E8E8ED', lineDash: [4, 4] } },
    },
    line: null,
}
```

### Y轴配置（分类轴）
```javascript
yAxis: {
    label: {
        style: { fontSize: 11, fill: '#86868B' },
    },
    line: null,
    tickLine: null,
}
```

---

## 3. 条形规范

| 参数 | 值 | 说明 |
|-----|---|-----|
| xField | string | 数值字段（水平方向） |
| yField | string | 分类字段（垂直方向） |
| color | `#5B8FF9` | 主题蓝 |
| barWidthRatio | `0.5` | 条形高度占比 |
| radius | `[0, 4, 4, 0]` | 右侧圆角（与柱状图不同） |

```javascript
barWidthRatio: 0.5,
barStyle: {
    radius: [0, 4, 4, 0],
},
```

---

## 4. 数据标签规范

| 参数 | 值 | 说明 |
|-----|---|-----|
| position | `right` | 条形右侧 |
| offset | `8` | 与条形距离 |
| fontSize | `11px` | 字号 |
| fill | `#5B8FF9` | 与条形同色 |

```javascript
label: {
    position: 'right',
    offset: 8,
    style: { fontSize: 11, fill: '#5B8FF9' },
    formatter: (datum) => datum.sales.toLocaleString(),
}
```

---

## 5. 柱状图 vs 条形图

| 特性 | 柱状图 Column | 条形图 Bar |
|-----|-------------|-----------|
| 方向 | 垂直 | 水平 |
| 标签空间 | X轴空间有限 | Y轴空间充足 |
| 适用标签 | 短标签（≤8字符） | 长标签（产品名等） |
| 圆角方向 | `[4,4,0,0]` 顶部 | `[0,4,4,0]` 右侧 |

---

## 6. 颜色规范

### 单系列
- 主色: `#5B8FF9`

### 多系列
```javascript
const colors = [
    '#5B8FF9',  // 蓝
    '#5AD8A6',  // 绿
    '#F6BD16',  // 黄
    '#E86452',  // 红
    '#945FB9',  // 紫
];
```

---

## 7. 完整配置

```javascript
const config = {
    data,
    xField: 'sales',
    yField: 'product',
    padding: [30, 50, 40, 200],
    color: '#5B8FF9',
    barWidthRatio: 0.5,
    barStyle: { radius: [0, 4, 4, 0] },
    label: {
        position: 'right',
        offset: 8,
        style: { fontSize: 11, fill: '#5B8FF9' },
        formatter: (datum) => datum.sales.toLocaleString(),
    },
    xAxis: {
        label: { formatter: (v) => (v / 1000).toFixed(0) + 'k' },
        grid: { line: { style: { stroke: '#E8E8ED', lineDash: [4, 4] } } },
        line: null,
    },
    yAxis: {
        label: { style: { fontSize: 11, fill: '#86868B' } },
        line: null,
        tickLine: null,
    },
};
```

---

## 8. 文件结构

```
03-bar/
├── index.html    # 可视化展示（带标注）
└── spec.md       # 设计规范文档
```
