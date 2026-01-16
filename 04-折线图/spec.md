# 折线图设计规范

## 图表标识
- **类型**: Line Chart
- **组件**: `@ant-design/charts` - Line
- **用途**: 展示数据随时间的变化趋势

---

## 1. 核心配置

```javascript
const config = {
    data,
    xField: 'month',
    yField: 'value',
    smooth: false,      // 是否平滑
    color: '#5B8FF9',
    lineStyle: {
        lineWidth: 2,
    },
    point: {
        size: 4,
        shape: 'circle',
    },
};
```

---

## 2. 样式规范

| 属性 | 值 | 说明 |
|-----|---|-----|
| lineWidth | 2 | 线条宽度 |
| point.size | 4 | 数据点大小 |
| color | #5B8FF9 | 主题色 |

---

## 3. 多系列配置

```javascript
{
    seriesField: 'type',
    color: ['#5B8FF9', '#5AD8A6', '#F6BD16'],
}
```

---

## 4. 文件结构

```
04-line/
├── index.html
└── spec.md
```
