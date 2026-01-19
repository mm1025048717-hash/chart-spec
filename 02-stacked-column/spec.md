# 堆叠柱状图设计规范

## 图表标识
- **类型**: Stacked Column Chart
- **组件**: `@ant-design/charts` - Column (isStack: true)
- **用途**: 展示各部分数值的堆叠构成

---

## 1. 尺寸规范

### Padding 配置
```javascript
padding: [40, 20, 50, 50]  // [上, 右, 下, 左]
```

---

## 2. 核心配置

```javascript
{
    seriesField: 'type',   // 分组字段
    isStack: true,         // 关键：开启堆叠
    isPercent: false,      // 可选：百分比堆叠
}
```

### 堆叠 vs 分组
| 配置 | 堆叠 | 分组 |
|-----|-----|-----|
| 属性 | `isStack: true` | `isGroup: true` |
| 适用 | 展示构成、累计 | 各系列对比 |

---

## 3. 坐标轴配置

### X轴
```javascript
xAxis: {
    label: { style: { fontSize: 11, fill: '#646A73' } },
    line: { style: { stroke: '#E5E6EB' } },
    tickLine: null,
}
```

### Y轴
```javascript
yAxis: {
    label: { style: { fontSize: 11, fill: '#646A73' } },
    grid: { line: { style: { stroke: '#E5E6EB', lineDash: [4, 4] } } },
    line: null,
    tickLine: null,
}
```

---

## 4. 柱体规范

| 参数 | 值 |
|-----|---|
| columnWidthRatio | `0.5` |
| radius | `[4, 4, 0, 0]` |

---

## 5. 百分比堆叠

```javascript
{
    isStack: true,
    isPercent: true,
    yAxis: {
        label: { formatter: (v) => (v * 100).toFixed(0) + '%' },
    },
}
```

---

## 6. 颜色规范

```javascript
color: ['#0071E3', '#34C759', '#FF9500', '#FF3B30', '#5856D6']

// 堆叠图圆角：仅顶部系列有圆角
columnStyle: (datum) => {
    if (datum.type === '顶部系列名') {
        return { radius: [4, 4, 0, 0] };
    }
    return { radius: 0 };
}
```
