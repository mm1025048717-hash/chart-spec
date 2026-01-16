# 折线图 - 文字优化设计规范

## 概述

折线图主要用于展示数据随时间变化的趋势，文字优化主要涉及 **X轴时间标签** 和 **图例文字**。

## 文字优化要点

### 1. X轴时间标签

| 数据密度 | 处理方式 | 配置 |
|---------|---------|------|
| 日数据 (≤30天) | 间隔显示 | tickCount: 6-8 |
| 月数据 | 显示月份 | formatter: MM月 |
| 年数据 | 完整显示 | - |
| 分类数据 | 旋转+截断 | rotate + truncate |

### 2. 图例文字

| 系列名长度 | 处理方式 |
|-----------|---------|
| ≤10字符 | 完整显示 |
| >10字符 | 截断+省略号 |

## 配置参数

### 折线样式

```javascript
{
    smooth: true,              // 平滑曲线
    lineStyle: {
        lineWidth: 2           // 线宽
    }
}
```

### 数据点配置

```javascript
point: {
    size: 3,
    shape: 'circle',
    style: {
        stroke: '#fff',
        lineWidth: 1
    }
}
```

### X轴时间配置

```javascript
xAxis: {
    tickCount: 8,              // 刻度数量
    label: {
        formatter: (v) => {
            // 日期格式化：2024-01-15 → 01-15
            return v.substring(5);
        },
        style: { fontSize: 11 }
    }
}
```

### 图例配置

```javascript
legend: {
    position: 'top-right',
    itemName: {
        formatter: (text) => {
            return text.length > 10 
                ? text.substring(0, 10) + '...' 
                : text;
        }
    }
}
```

### Tooltip配置

```javascript
tooltip: {
    showCrosshairs: true,
    crosshairs: {
        type: 'x'              // 显示垂直参考线
    }
}
```

## 日期格式规范

| 时间粒度 | 格式 | 示例 |
|---------|------|------|
| 日 | MM-DD | 01-15 |
| 周 | 第W周 | 第3周 |
| 月 | YYYY-MM | 2024-01 |
| 季度 | YYYY-Qn | 2024-Q1 |
| 年 | YYYY | 2024 |

## 多系列颜色

```javascript
color: [
    '#5B8FF9',  // 蓝色
    '#5AD8A6',  // 绿色
    '#F6BD16',  // 黄色
    '#E86452',  // 红色
    '#9270CA',  // 紫色
    '#6DC8EC',  // 青色
]
```

## 注意事项

1. **数据点数量** - 超过50个点时考虑隐藏数据点
2. **多系列限制** - 建议不超过5条线，否则难以区分
3. **数据标签** - 仅在关键点显示，使用 hide-overlap 避免重叠
4. **交互** - 启用 crosshairs 提升数据读取体验

## 相关文档

- [面积图](../05-面积图/README.md)
- [柱状图](../01-柱状图/README.md)
