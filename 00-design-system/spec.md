# 图表设计系统 - 完整规范文档

## 概述
本文档定义了所有图表的统一设计规范，包括尺寸、间距、颜色、坐标轴、标注元素等。

---

## 1. 容器尺寸

| 类型 | 高度 | CSS Class | 适用场景 |
|-----|------|-----------|---------|
| XS | 200px | `.chart-body.xs` | 迷你图表 |
| SM | 300px | `.chart-body.sm` | 卡片图表 |
| **MD** | **400px** | `.chart-body.md` | **标准（默认）** |
| LG | 500px | `.chart-body.lg` | 详情页 |
| XL | 600px | `.chart-body.xl` | 全屏/报表 |

---

## 2. 内边距 (Padding)

### 容器内边距
```css
.chart-body {
    padding: 20px;
}
```

### G2Plot 图表内边距
```javascript
// 标准配置
padding: [40, 40, 60, 60]  // [上, 右, 下, 左]

// 紧凑配置（小图表）
padding: [30, 30, 50, 50]

// 自动配置
padding: 'auto'
appendPadding: [10, 10, 10, 10]
```

---

## 3. 坐标轴规范

### X轴
```javascript
xAxis: {
    label: {
        autoRotate: false,
        rotate: 0,  // 0 | -Math.PI/4 | -Math.PI/2
        style: {
            fontSize: 11,
            fill: '#646A73',
            textAlign: 'center',  // 旋转时用 'end'
        },
    },
    line: { style: { stroke: '#E5E6EB' } },
    tickLine: null,
}
```

### Y轴
```javascript
yAxis: {
    label: {
        style: { fontSize: 11, fill: '#646A73' },
        formatter: (v) => v.toLocaleString(),
    },
    grid: {
        line: { style: { stroke: '#E5E6EB', lineDash: [4, 4] } },
    },
    line: null,
}
```

---

## 4. X轴旋转角度

| 角度 | 代码值 | textAlign | 适用场景 |
|-----|-------|-----------|---------|
| 0° | `rotate: 0` | `'center'` | 短文本(≤4字符)，少数据(≤8项) |
| **-45°** | `rotate: -Math.PI/4` | `'end'` | **中等文本(5-8字符)、多数据(≥15项)，推荐默认** |
| -90° | `rotate: -Math.PI/2` | `'end'` | 仅当 45° 仍重叠时兜底（阅读需歪头） |

---

## 5. 色彩系统

### 主题色
| 名称 | 色值 | 用途 |
|-----|------|-----|
| Blue | `#0071E3` | 主色、销售额 |
| Green | `#34C759` | 达成率、增长 |
| Yellow | `#FF9500` | 警告、流量 |
| Red | `#FF3B30` | 危险、下降 |
| Purple | `#5856D6` | 辅助 |
| Cyan | `#32ADE6` | 辅助 |

### 多系列颜色数组
```javascript
const colors = ['#0071E3', '#34C759', '#FF9500', '#FF3B30', '#5856D6', '#32ADE6'];
```

### 辅助色
| 名称 | 色值 | 用途 |
|-----|------|-----|
| 主文字 | `#1F2329` | 标题、图例 |
| 次文字 | `#646A73` | 轴标签、说明 |
| 边框 | `#E5E6EB` | 轴线、网格 |
| 背景 | `#F7F8FA` | 表头、单位标签 |

---

## 6. 字号规范

| 元素 | 字号 | 字重 | 颜色 |
|-----|-----|-----|-----|
| 图表标题 | 15px | 600 | #1F2329 |
| 图例文字 | 12px | 400 | #1F2329 |
| 坐标轴标签 | 11px | 400 | #646A73 |
| 数据标签 | 11px | 400 | 与图形同色 |
| 轴单位 | 11px | 400 | #646A73 |
| Tooltip | 12px | 400/600 | #1F2329/#646A73 |

---

## 7. 柱状图规范

```javascript
{
    columnWidthRatio: 0.5,
    columnStyle: { radius: [4, 4, 0, 0] },
    marginRatio: 0.25,  // 分组间距
    minColumnWidth: 8,
    maxColumnWidth: 40,
    label: {
        position: 'top',
        style: { fontSize: 11, fill: '#0071E3' },
    },
}
```

---

## 8. 折线图规范

```javascript
{
    lineStyle: { lineWidth: 2 },
    point: {
        size: 4,
        shape: 'circle',
    },
    smooth: false,
}
```

---

## 9. 图例规范

```javascript
legend: {
    position: 'top-right',
    itemSpacing: 16,
    marker: {
        symbol: 'square',  // 柱状图
        // symbol: 'line',  // 折线图
        style: { r: 5 },
    },
    itemName: {
        style: { fontSize: 12, fill: '#1F2329' },
    },
}
```

---

## 10. Tooltip 规范

```javascript
tooltip: {
    showTitle: true,
    formatter: (datum) => ({
        name: datum.type,
        value: datum.value.toLocaleString() + ' 万元',
    }),
}
```

---

## 11. 交互规范

```javascript
{
    state: {
        active: { style: { fillOpacity: 0.8 } },
        inactive: { style: { fillOpacity: 0.4 } },
    },
    interactions: [
        { type: 'element-active' },
        { type: 'legend-highlight' },
    ],
}
```

---

## 12. 文件结构

```
charts/
├── 00-design-system/    # 设计系统规范
├── 01-column/           # 柱状图
├── 02-stacked-column/   # 堆叠柱状图
├── ...                  # 其他图表
├── common.css           # 通用样式
└── index.html           # 总索引
```
