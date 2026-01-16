# 雷达图设计规范

## 图表标识
- **类型**: Radar Chart
- **用途**: 多维度数据对比分析

## 核心配置
```javascript
{
    xField: 'dimension',
    yField: 'value',
    seriesField: 'name',
    area: { style: { fillOpacity: 0.2 } },
}
```

## 使用建议
- 维度数量建议5-8个
- 各维度数值范围应一致
