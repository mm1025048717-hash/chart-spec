# 柱状图设计规范

## 图表标识
- **类型**: Column Chart
- **组件**: `@ant-design/charts` - Column
- **用途**: 比较不同类别之间的数值大小

---

## 1. 尺寸规范

### 容器尺寸
| 参数 | 值 | 说明 |
|-----|---|-----|
| 标准高度 | `400px` | 默认图表高度 |
| 紧凑高度 | `320px` | 并排展示时 |
| 容器内边距 | `20px` | chart-body padding |

### Padding 配置
```javascript
padding: [40, 20, 50, 50]  // [上, 右, 下, 左]
```

| 位置 | 值 | 用途 |
|-----|---|-----|
| 上 | `40px` | 图例区域 |
| 右 | `20px` | 右侧留白 |
| 下 | `50px` | X轴标签区域 |
| 左 | `50px` | Y轴标签区域 |

---

## 2. 坐标轴规范

### X轴配置
```javascript
xAxis: {
    label: {
        autoRotate: false,
        rotate: 0,  // 或 -Math.PI/4 (45°), -Math.PI/2 (90°)
        style: {
            fontSize: 11,
            fill: '#86868B',
            textAlign: 'center',  // 旋转时改为 'end'
        },
    },
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
    grid: {
        line: { style: { stroke: '#E8E8ED', lineDash: [4, 4] } },
    },
    line: null,
    tickLine: null,
}
```

### 轴标签旋转策略
| 场景 | rotate | textAlign | 截断 |
|-----|--------|-----------|-----|
| 短文本 ≤4字符 | `0` | `center` | 无 |
| 中等文本 5-8字符 | `-Math.PI/4` | `end` | 无 |
| 长文本 >8字符 | `-Math.PI/4` | `end` | 8字符 |
| 项数 ≥15 | **`-Math.PI/4`** | `end` | 6字符（优先 45°，可读性更好） |
| 项数 ≥20 或 45° 仍重叠 | `-Math.PI/2` | `end` | 6字符（90° 兜底） |

---

## 3. 柱体规范

| 参数 | 值 | 说明 |
|-----|---|-----|
| color | `#0071E3` | 主题蓝 |
| columnWidthRatio | `0.5` | 宽度占比 |
| radius | `[4, 4, 0, 0]` | 仅顶部圆角 |
| maxColumnWidth | `48` | 最大宽度 |
| minColumnWidth | `8` | 最小宽度 |

```javascript
columnWidthRatio: 0.5,
columnStyle: {
    radius: [4, 4, 0, 0],
},
```

---

## 4. 数据标签规范

| 参数 | 值 | 说明 |
|-----|---|-----|
| position | `top` | 柱体上方 |
| offset | `8` | 与柱体距离 |
| fontSize | `11px` | 字号 |
| fill | `#0071E3` | 与柱体同色 |

```javascript
label: {
    position: 'top',
    offset: 8,
    style: { fontSize: 11, fill: '#0071E3' },
    formatter: (datum) => datum.value.toLocaleString(),
}
```

---

## 5. 图例规范

| 参数 | 值 |
|-----|---|
| position | `top-right` |
| itemSpacing | `20` |
| marker.symbol | `square` |
| marker.size | `10×10px` |
| marker.radius | `2px` |

---

## 6. 颜色规范

### 单系列
- 主色: `#0071E3`

### 多系列
```javascript
const colors = [
    '#0071E3',  // 蓝
    '#34C759',  // 绿
    '#FF9500',  // 黄
    '#FF3B30',  // 红
    '#5856D6',  // 紫
];
```

---

## 7. 完整配置

```javascript
const config = {
    data,
    xField: 'region',
    yField: 'value',
    padding: [40, 20, 50, 50],
    color: '#0071E3',
    columnWidthRatio: 0.5,
    columnStyle: { radius: [4, 4, 0, 0] },
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
    label: {
        position: 'top',
        offset: 8,
        style: { fontSize: 11, fill: '#0071E3' },
    },
    legend: { position: 'top-right', itemSpacing: 20 },
};
```

---

## 8. 文件结构

```
01-column/
├── index.html    # 可视化展示（带标注）
└── spec.md       # 设计规范文档
```
