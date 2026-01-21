# 环图设计规范

## 图表标识
- **类型**: Ring Chart (Donut Chart)
- **组件**: `@antv/g2plot` - Pie
- **用途**: 显示同一维度上占比关系，中心可展示汇总数据或关键指标

---

## 1. 尺寸规范

### 容器尺寸
| 参数 | 值 | 说明 |
|-----|---|-----|
| 标准高度 | `320px` | 默认图表高度 |
| 紧凑高度 | `240px` | 小型环图 |
| 容器内边距 | `20px` | chart-body padding |

---

## 2. 环图规范

| 参数 | 值 | 说明 |
|-----|---|-----|
| `radius` | `0.85` | 外半径比例 |
| `innerRadius` | `0.6` | 内半径比例（形成环形） |
| `pieStyle.lineWidth` | `2` | 扇形间隔线宽 |
| `pieStyle.stroke` | `#fff` | 扇形间隔颜色 |

```javascript
radius: 0.85,
innerRadius: 0.6,
pieStyle: { lineWidth: 2, stroke: '#fff' },
```

---

## 3. 标签规范

### 内部标签
```javascript
label: {
    type: 'inner',
    offset: '-50%',
    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    style: { fill: '#fff', fontSize: 12, fontWeight: 600 },
},
```

### 外部标签（蜘蛛标签）
```javascript
label: {
    type: 'spider',
    labelHeight: 24,
    content: '{name}\n{percentage}',
    style: { fontSize: 11, fill: '#86868B' },
},
```

---

## 4. 中心统计信息

```javascript
statistic: {
    title: {
        content: 'Total',
        style: {
            fontSize: '12px',
            color: '#86868B',
        },
    },
    content: {
        content: '8,846',
        style: {
            fontSize: '28px',
            fontWeight: 700,
            color: '#1D1D1F',
        },
    },
},
```

| 参数 | 值 | 说明 |
|-----|---|-----|
| title.fontSize | `12px` | 标题字号 |
| title.color | `#86868B` | 标题颜色 |
| content.fontSize | `28px` | 数值字号 |
| content.fontWeight | `700` | 数值字重 |
| content.color | `#1D1D1F` | 数值颜色 |

---

## 5. 颜色规范

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

## 6. 环图变体

### 基础环图
- `innerRadius: 0.6` - 标准内径

### 细环图
- `innerRadius: 0.85` - 更大内径，用于简单进度展示

### 外部标签环图
- `label.type: 'spider'` - 蜘蛛标签布局

---

## 7. 完整配置

```javascript
const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.85,
    innerRadius: 0.6,
    color: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#945FB9'],
    label: {
        type: 'inner',
        offset: '-50%',
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: { fill: '#fff', fontSize: 12, fontWeight: 600 },
    },
    statistic: {
        title: {
            content: '总销售额',
            style: { fontSize: '12px', color: '#86868B' },
        },
        content: {
            content: '8,846',
            style: { fontSize: '28px', fontWeight: 700 },
        },
    },
    legend: false,
    interactions: [{ type: 'element-active' }],
    pieStyle: { lineWidth: 2, stroke: '#fff' },
};
```

---

## 8. 文件结构

```
20-ring/
├── index.html    # 可视化展示（带标注）
└── spec.md       # 设计规范文档
```
