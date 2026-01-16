# 水平柱状图 - 文字优化设计规范

## 概述

水平柱状图（条形图）特别适合展示**长文本分类**的数据对比，因为Y轴可以容纳更多文字内容。

## 适用场景

- 分类名称较长（>6字符）
- 排行榜展示
- 需要清晰对比数值大小

## Y轴标签处理规则

| 标签长度 | 处理方式 | Y轴宽度 | 配置 |
|---------|---------|--------|------|
| ≤6字符 | 完整显示 | 60px | - |
| 7-10字符 | 完整显示 | 90px | 调整padding |
| 11-15字符 | 截断10字符 | 100px | truncate(10) |
| >15字符 | 截断12字符 | 120px | truncate(12) |

## 配置参数

### 柱子配置

```javascript
{
    barWidthRatio: 0.6,           // 柱子宽度比例
    barStyle: {
        radius: [0, 4, 4, 0]      // 右侧圆角
    },
    color: '#5B8FF9'
}
```

### Y轴标签配置

```javascript
yAxis: {
    label: {
        formatter: (text) => {
            return text.length > 12 
                ? text.substring(0, 12) + '...' 
                : text;
        },
        style: {
            fontSize: 11,
            fill: '#646A73'
        }
    }
}
```

### 数据标签配置

```javascript
label: {
    position: 'right',           // 柱子右侧
    style: {
        fontSize: 10,
        fill: '#5B8FF9'
    }
}
```

## 内边距计算

```javascript
// 根据Y轴标签长度动态计算左侧padding
const maxLen = Math.max(...data.map(d => d.product.length));
let leftPadding = 60;

if (maxLen > 6 && maxLen <= 10) leftPadding = 90;
else if (maxLen > 10 && maxLen <= 15) leftPadding = 100;
else if (maxLen > 15) leftPadding = 120;

// 应用到图表配置
padding: [20, 40, 30, leftPadding]
```

## 与垂直柱状图对比

| 特性 | 垂直柱状图 | 水平柱状图 |
|-----|----------|----------|
| 标签位置 | X轴（底部） | Y轴（左侧） |
| 文字显示 | 需要旋转 | 水平显示 |
| 长文本友好度 | 低 | 高 |
| 推荐场景 | 短分类名 | 长分类名/排行榜 |

## 注意事项

1. **Y轴宽度自适应** - 根据最长标签动态调整
2. **Tooltip必须完整** - 截断后通过Tooltip显示完整信息
3. **数据排序** - 通常按数值大小排序展示
4. **数据项数量** - 建议不超过15项，否则考虑分页

## 相关文档

- [柱状图](../01-柱状图/README.md)
- [堆叠柱状图](../02-堆叠柱状图/README.md)
