# 热力图设计规范

## 图表标识
- **类型**: Heatmap
- **用途**: 展示二维数据的分布密度

## 核心配置
```javascript
{
    xField: 'x',
    yField: 'y',
    colorField: 'value',
    color: ['#E8F3FF', '#0071E3', '#0051D4'],
}
```

## 使用场景
- 时间维度热力分析
- 用户行为分布
- 相关性矩阵
