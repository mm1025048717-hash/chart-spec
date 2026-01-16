# 柱状图 - 文字优化设计规范

## 概述

柱状图是最常用的数据可视化图表之一，用于展示分类数据的数值大小比较。本规范主要解决 **X轴标签文字过长** 的显示问题。

## 核心问题

当X轴分类标签文字过长时，会出现以下问题：
1. 文字重叠，无法辨认
2. 文字被截断，信息丢失
3. 布局混乱，影响美观

## 解决方案

### 智能处理流程

```
计算视觉宽度 → 判断旋转角度 → 截断处理 → Tooltip显示完整
```

### 视觉宽度计算

| 字符类型 | 视觉宽度 | 示例 |
|---------|---------|------|
| 中文字符 | 2单位 | "华东" = 4 |
| 英文/数字 | 1单位 | "Q1" = 2 |
| 混合 | 累加 | "iPhone15" = 8 |

### 处理规则

| 条件 | 旋转角度 | 截断 | 适用场景 |
|-----|---------|------|---------|
| 视觉宽度 ≤4 且 数据项 ≤8 | 0° (水平) | 无 | 华东、Q1 |
| 视觉宽度 5-8 且 数据项 ≤12 | -45° | 无 | 华东地区 |
| 视觉宽度 9-50 | -45° | 前8字符+... | iPhone 15 Pro |
| 视觉宽度 ≥50 或 数据项 ≥15 | -90° | 前6字符+... | 超长产品名 |

## 配置参数

### 柱状图基础配置

```javascript
{
    columnWidthRatio: 0.5,      // 柱子宽度比例 (0-1)
    columnStyle: {
        radius: [4, 4, 0, 0]    // 顶部圆角
    },
    color: '#5B8FF9'            // 柱子颜色
}
```

### X轴标签配置

```javascript
xAxis: {
    label: {
        autoRotate: false,       // 关闭自动旋转
        rotate: -Math.PI/4,      // 手动设置角度
        formatter: (text) => {   // 截断处理
            return text.length > 8 
                ? text.substring(0, 8) + '...' 
                : text;
        },
        style: {
            fontSize: 11,
            fill: '#646A73',
            textAlign: 'end'     // 倾斜时右对齐
        }
    }
}
```

### 数据标签配置

```javascript
label: {
    position: 'top',            // 位置: top/middle/bottom
    style: {
        fontSize: 10,
        fill: '#5B8FF9'
    },
    formatter: (datum) => {
        return (datum.value / 10000).toFixed(1) + '万';
    }
}
```

### Tooltip配置

```javascript
tooltip: {
    formatter: (datum) => ({
        name: datum.product,     // 显示完整文字
        value: datum.value.toLocaleString() + ' 元'
    })
}
```

## 尺寸规范

### 容器尺寸

| 场景 | 高度 | 说明 |
|-----|------|------|
| 小型 | 300px | 数据项 ≤5 |
| 中型 | 400px | 数据项 6-10 |
| 大型 | 500px | 数据项 11-15 |
| 超大 | 600px | 数据项 >15 |

### 内边距 (padding)

```javascript
padding: [top, right, bottom, left]
// 示例: [40, 20, 80, 55]
```

| 位置 | 数值 | 说明 |
|-----|------|------|
| top | 40px | 顶部留白 |
| right | 20px | 右侧留白 |
| bottom | 80px | X轴标签区域 |
| left | 55px | Y轴标签区域 |

### X轴标签区域高度

| 旋转角度 | 建议高度 |
|---------|---------|
| 0° | 30-35px |
| -45° | 55-65px |
| -90° | 85-100px |

## 代码实现

### 完整的智能配置函数

```javascript
// 视觉宽度计算
function getVisualWidth(str) {
    let width = 0;
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if (code >= 0x4E00 && code <= 0x9FFF ||
            code >= 0x3000 && code <= 0x303F ||
            code >= 0xFF00 && code <= 0xFFEF) {
            width += 2;
        } else {
            width += 1;
        }
    }
    return width;
}

// 智能X轴配置
const SmartXAxis = {
    getConfig(data, xField, options = {}) {
        const { 
            maxTruncate = 8, 
            minTruncate = 6, 
            threshold = 15 
        } = options;
        
        const maxLen = Math.max(
            ...data.map(d => getVisualWidth(String(d[xField] || '')))
        );
        const count = data.length;

        let rotate, truncateAt;
        
        if (maxLen <= 4 && count <= 8) {
            rotate = 0;
            truncateAt = null;
        } else if (maxLen <= 8 && count <= 12) {
            rotate = -Math.PI / 4;
            truncateAt = null;
        } else if (maxLen >= 50 || count >= threshold) {
            rotate = -Math.PI / 2;
            truncateAt = minTruncate;
        } else {
            rotate = -Math.PI / 4;
            truncateAt = maxTruncate;
        }

        return {
            label: {
                autoRotate: false,
                rotate,
                formatter: (text) => {
                    const str = String(text || '');
                    if (truncateAt && str.length > truncateAt) {
                        return str.substring(0, truncateAt) + '...';
                    }
                    return str;
                },
                style: {
                    fontSize: 11,
                    fill: '#646A73',
                    textAlign: rotate === 0 ? 'center' : 'end'
                }
            }
        };
    }
};
```

### 使用示例

```javascript
import { Column } from '@antv/g2plot';

const data = [
    { product: 'MacBook Pro 16英寸', value: 120000 },
    { product: 'iPhone 15 Pro Max', value: 72000 },
    // ...
];

const chart = new Column('container', {
    data,
    xField: 'product',
    yField: 'value',
    color: '#5B8FF9',
    columnWidthRatio: 0.5,
    columnStyle: { radius: [4, 4, 0, 0] },
    xAxis: SmartXAxis.getConfig(data, 'product'),
    tooltip: {
        formatter: (datum) => ({
            name: datum.product,
            value: datum.value.toLocaleString() + ' 元'
        })
    }
});

chart.render();
```

## 颜色规范

### 单色柱状图

| 场景 | 颜色 | 色值 |
|-----|------|------|
| 主色 | 蓝色 | #5B8FF9 |
| 成功 | 绿色 | #5AD8A6 |
| 警告 | 黄色 | #F6BD16 |
| 危险 | 红色 | #E86452 |

### 多色柱状图

使用调色板：
```javascript
color: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E86452', '#9270CA', '#6DC8EC']
```

## 注意事项

1. **Tooltip必须显示完整信息** - 截断只是视觉优化，完整信息通过Tooltip展示
2. **避免过度截断** - 截断后的文字应该能让用户大致理解含义
3. **数据项过多时考虑分页或滚动** - 超过20项建议添加 dataZoom
4. **响应式适配** - 移动端可能需要更激进的截断策略

## 相关文档

- [堆叠柱状图](../02-堆叠柱状图/README.md)
- [水平柱状图](../03-水平柱状图/README.md)
- [通用样式规范](../common.css)
