# 折线图设计规范

## 图表标识
- **类型**: Line Chart
- **组件**: `@ant-design/charts` - Line
- **用途**: 展示数据随时间的变化趋势

---

## 1. 尺寸规范

### Padding 配置
```javascript
padding: [40, 20, 50, 50]  // [上, 右, 下, 左]
```

---

## 2. 折线规范

| 参数 | 值 | 说明 |
|-----|---|-----|
| color | `#0071E3` | 主题蓝 |
| lineStyle.lineWidth | `2` | 线宽 |
| smooth | `false` | 是否平滑 |

---

## 3. 数据点规范

| 参数 | 值 | 说明 |
|-----|---|-----|
| point.size | `4` | 数据点大小 |
| point.shape | `circle` | 数据点形状 |
| point.style.fill | `#0071E3` | 填充色 |

---

## 4. 坐标轴配置

### X轴
```javascript
xAxis: {
    label: { style: { fontSize: 11, fill: '#86868B' } },
    line: { style: { stroke: '#E8E8ED' } },
    tickLine: null,
}
```

### Y轴
```javascript
yAxis: {
    label: { style: { fontSize: 11, fill: '#86868B' } },
    grid: { line: { style: { stroke: '#E8E8ED', lineDash: [4, 4] } } },
    line: null,
    tickLine: null,
}
```

---

## 5. 多系列配置

```javascript
{
    seriesField: 'type',
    color: ['#0071E3', '#34C759'],
}
```

---

## 6. 图例规范

| 参数 | 值 |
|-----|---|
| position | `top-right` |
| marker.symbol | `line` (折线图) |
| marker.size | `16×2px` |
