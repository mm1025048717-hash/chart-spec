# 柱状图设计规范

## 图表标识
- **类型**: Column Chart
- **组件**: `@ant-design/charts` - Column
- **用途**: 比较不同类别之间的数值大小

---

## 1. 适用场景

| 场景 | 示例 |
|-----|------|
| 分类对比 | 各地区销售额对比 |
| 时间对比 | 月度/季度数据对比 |
| 排行展示 | 产品销量TOP10 |
| 预实对比 | 预算vs实际完成 |

### 不适用场景
- 数据项过多 (>20) → 考虑条形图
- 展示趋势变化 → 考虑折线图
- 展示占比关系 → 考虑饼图

---

## 2. 核心配置

```javascript
const config = {
    data,
    xField: 'category',      // X轴字段
    yField: 'value',         // Y轴字段
    color: '#5B8FF9',        // 柱体颜色
    columnWidthRatio: 0.5,   // 柱体宽度占比
    columnStyle: {
        radius: [4, 4, 0, 0], // 顶部圆角
    },
};
```

---

## 3. 样式规范

### 柱体样式
| 属性 | 值 | 说明 |
|-----|---|-----|
| color | `#5B8FF9` | 主题蓝 |
| columnWidthRatio | `0.5` | 宽度占比50% |
| radius | `[4, 4, 0, 0]` | 仅顶部圆角 |

### 数据标签
```javascript
label: {
    position: 'top',
    style: {
        fill: '#5B8FF9',
        fontSize: 11,
    },
    formatter: (datum) => datum.value.toLocaleString(),
}
```

### 轴配置
```javascript
xAxis: {
    label: {
        style: { fontSize: 11, fill: '#646A73' },
    },
},
yAxis: {
    label: {
        formatter: (v) => v.toLocaleString(),
    },
},
```

---

## 4. 变体类型

### 基础柱状图
单系列数据对比

### 分组柱状图
```javascript
{
    seriesField: 'type',
    isGroup: true,
    color: ['#5B8FF9', '#5AD8A6'],
}
```

### 堆叠柱状图
→ 见 02-stacked-column

---

## 5. 颜色规范

### 单系列
- 主色: `#5B8FF9`

### 多系列
```javascript
const colors = [
    '#5B8FF9',  // 蓝
    '#5AD8A6',  // 绿
    '#F6BD16',  // 黄
    '#E86452',  // 红
    '#9270CA',  // 紫
];
```

---

## 6. 交互配置

### Tooltip
```javascript
tooltip: {
    formatter: (datum) => ({
        name: datum.category,
        value: datum.value.toLocaleString() + ' 万元',
    }),
}
```

### 状态样式
```javascript
state: {
    active: {
        style: { fillOpacity: 0.8 },
    },
}
```

---

## 7. 文件结构

```
01-column/
├── index.html    # 可视化展示
└── spec.md       # 设计规范
```
