# 旭日图设计规范

## 图表标识
- **类型**: Sunburst Chart
- **组件**: `@antv/g2plot` - Sunburst
- **用途**: 展示层级数据的占比关系，从内到外表示数据层级，适合展示组织架构、分类结构等

---

## 1. 尺寸规范

### 容器尺寸
| 参数 | 值 | 说明 |
|-----|---|-----|
| 标准高度 | `400px` | 推荐使用大型图表高度 |
| 层级深度 | `2-4层` | 建议不超过4层，否则难以阅读 |
| 扇形最小角度 | `≥5°` | 确保标签可读性 |

---

## 2. 旭日图规范

| 参数 | 值 | 说明 |
|-----|---|-----|
| `innerRadius` | `0.25 - 0.3` | 内径比例，控制中心圆大小 |
| `hierarchyConfig.field` | string | 层级数据值字段 |
| `sunburstStyle.stroke` | `#fff` | 扇形边框颜色 |
| `sunburstStyle.lineWidth` | `1` | 扇形边框宽度 |

```javascript
innerRadius: 0.25,
hierarchyConfig: {
    field: 'value',
},
sunburstStyle: {
    stroke: '#fff',
    lineWidth: 1,
},
```

---

## 3. 标签规范

```javascript
label: {
    layout: [{ type: 'limit-in-shape' }],
    style: { fontSize: 10, fill: '#fff' },
},
```

| 参数 | 值 | 说明 |
|-----|---|-----|
| `label.layout` | `[{ type: 'limit-in-shape' }]` | 标签布局，防止溢出 |
| `label.style.fontSize` | `10px` | 标签字号 |
| `label.style.fill` | `#fff` | 标签颜色 |

---

## 4. 颜色规范

```javascript
const colors = [
    '#5B8FF9',  // 蓝
    '#5AD8A6',  // 绿
    '#F6BD16',  // 黄
    '#945FB9',  // 紫
    '#E86452',  // 红
    '#00C7BE',  // 青
    '#FF9845',  // 橙
];
```

---

## 5. 数据格式

旭日图需要层级数据结构：

```javascript
const data = {
    name: '公司',
    children: [
        {
            name: '研发中心',
            children: [
                { name: '前端组', value: 68 },
                { name: '后端组', value: 85 },
                { name: '移动组', value: 42 },
            ],
        },
        {
            name: '产品部',
            children: [
                { name: '产品经理', value: 24 },
                { name: 'UI设计', value: 18 },
            ],
        },
    ],
};
```

---

## 6. 适用场景

### ✓ 适合
- 组织架构展示
- 产品分类层级
- 文件目录结构
- 地理区域层级（国家-省-市）

### ✗ 不适合
- 时间序列数据
- 非层级关系数据
- 简单占比展示
- 层级过深（>4层）的数据

---

## 7. 完整配置

```javascript
const config = {
    data: hierarchyData,
    innerRadius: 0.25,
    hierarchyConfig: {
        field: 'value',
    },
    color: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#945FB9', '#E86452', '#00C7BE', '#FF9845'],
    interactions: [{ type: 'element-active' }],
    label: {
        layout: [{ type: 'limit-in-shape' }],
        style: { fontSize: 11, fill: '#fff' },
    },
    sunburstStyle: {
        stroke: '#fff',
        lineWidth: 1,
    },
    tooltip: {
        formatter: (datum) => ({
            name: datum.name,
            value: datum.value ? `${datum.value}人` : '',
        }),
    },
};
```

---

## 8. 文件结构

```
24-sunburst/
├── index.html    # 可视化展示（带标注）
└── spec.md       # 设计规范文档
```
