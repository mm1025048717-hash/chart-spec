# 桑基图设计规范

## 图表标识
- **类型**: Sankey Chart
- **组件**: `@antv/g2plot` - Sankey
- **用途**: 展示数据的流向和流量关系，常用于能源流转、用户路径、资金流向等场景

---

## 1. 尺寸规范

### 容器尺寸
| 参数 | 值 | 说明 |
|-----|---|-----|
| 标准高度 | `500px` | 桑基图通常需要较大空间 |
| 紧凑高度 | `400px` | 节点较少时 |
| 容器内边距 | `20px` | chart-body padding |

---

## 2. 桑基图规范

| 参数 | 值 | 说明 |
|-----|---|-----|
| `sourceField` | string | 源节点字段 |
| `targetField` | string | 目标节点字段 |
| `weightField` | string | 流量权重字段 |
| `nodeWidthRatio` | `0.01` | 节点宽度比例 |
| `nodePaddingRatio` | `0.03` | 节点间距比例 |

```javascript
sourceField: 'source',
targetField: 'target',
weightField: 'value',
nodeWidthRatio: 0.012,
nodePaddingRatio: 0.025,
```

---

## 3. 节点样式

```javascript
nodeStyle: {
    opacity: 1,
    fillOpacity: 1,
},
```

| 参数 | 值 | 说明 |
|-----|---|-----|
| `nodeStyle.opacity` | `1` | 节点透明度 |
| `nodeStyle.fillOpacity` | `1` | 节点填充透明度 |

---

## 4. 边样式

```javascript
edgeStyle: {
    fillOpacity: 0.35,
},
```

| 参数 | 值 | 说明 |
|-----|---|-----|
| `edgeStyle.fillOpacity` | `0.35 - 0.4` | 边填充透明度 |

---

## 5. 标签规范

```javascript
label: {
    formatter: ({ name }) => name,
    style: { fill: '#1D1D1F', fontSize: 11 },
},
```

| 参数 | 值 | 说明 |
|-----|---|-----|
| `label.style.fontSize` | `11px` | 标签字号 |
| `label.style.fill` | `#1D1D1F` | 标签颜色 |

---

## 6. 颜色规范

```javascript
const colors = [
    '#5B8FF9',  // 蓝
    '#5AD8A6',  // 绿
    '#F6BD16',  // 黄
    '#945FB9',  // 紫
    '#E86452',  // 红
    '#00C7BE',  // 青
    '#FF9845',  // 橙
    '#86868B',  // 灰
];
```

---

## 7. 数据格式

```javascript
const data = [
    { source: '搜索引擎', target: '首页', value: 45000 },
    { source: '搜索引擎', target: '产品页', value: 15000 },
    { source: '首页', target: '浏览商品', value: 68000 },
    { source: '首页', target: '流失', value: 20000 },
    { source: '浏览商品', target: '加入购物车', value: 45000 },
    { source: '加入购物车', target: '完成购买', value: 8500 },
];
```

---

## 8. 适用场景

### ✓ 适合
- 用户行为路径分析
- 能源/资金流向展示
- 系统数据流转
- 分类归因分析

### ✗ 不适合
- 简单占比数据
- 时间序列趋势
- 节点过多的场景（>20个）
- 无明确流向关系的数据

---

## 9. 完整配置

```javascript
const config = {
    data,
    sourceField: 'source',
    targetField: 'target',
    weightField: 'value',
    nodeStyle: {
        opacity: 1,
        fillOpacity: 1,
    },
    edgeStyle: {
        fillOpacity: 0.35,
    },
    color: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#945FB9', '#E86452', '#00C7BE', '#FF9845', '#86868B'],
    nodeWidthRatio: 0.012,
    nodePaddingRatio: 0.025,
    label: {
        formatter: ({ name }) => name,
        style: { fill: '#1D1D1F', fontSize: 11 },
    },
    tooltip: {
        formatter: (datum) => {
            if (datum.source && datum.target) {
                return {
                    name: `${datum.source} → ${datum.target}`,
                    value: datum.value.toLocaleString(),
                };
            }
            return { name: datum.name, value: datum.value?.toLocaleString() };
        },
    },
};
```

---

## 10. 文件结构

```
25-sankey/
├── index.html    # 可视化展示（带标注）
└── spec.md       # 设计规范文档
```
