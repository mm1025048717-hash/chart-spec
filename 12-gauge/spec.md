# 仪表盘设计规范

## 图表标识
- **类型**: Gauge
- **用途**: 展示指标完成进度

## 核心配置
```javascript
{
    percent: 0.75,
    range: { color: '#0071E3' },
    statistic: {
        content: {
            formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        },
    },
}
```

## 多色配置
```javascript
range: {
    ticks: [0, 1/3, 2/3, 1],
    color: ['#E86452', '#F6BD16', '#5AD8A6'],
}
```
