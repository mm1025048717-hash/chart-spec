# 多数据项场景设计规范

## 场景标识
- **场景编号**: 06
- **场景名称**: 多数据项90度垂直
- **适用条件**: 数据项 ≥ 15

---

## 1. 触发条件

### 判断逻辑
```javascript
function shouldUse90DegreeByCount(data) {
    return data.length >= 15;
}
```

### 条件说明
| 条件 | 阈值 | 说明 |
|-----|------|-----|
| 数据项数量 | ≥ 15 | 不管文字长度 |
| 截断长度 | 6 字符 | 与场景4相同 |

### 为什么是15项？
- 45°倾斜的标签在15项以上会开始重叠
- 横向空间不足以容纳
- 90°垂直最大化空间利用率

---

## 2. 配置参数

### X轴配置
```javascript
xAxis: {
    label: {
        autoRotate: false,
        rotate: -Math.PI / 2,  // 90度
        formatter: (text) => {
            const maxLength = 6;
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        },
        style: {
            fontSize: 11,
            fill: '#646A73',
            textAlign: 'end',
        },
    },
}
```

### 柱体配置（与场景4的区别）
```javascript
{
    // 多数据项时柱体更窄
    columnWidthRatio: 0.6,  // 标准是0.5
    columnStyle: {
        radius: [3, 3, 0, 0],  // 标准是[4,4,0,0]
    },
}
```

---

## 3. 场景4 vs 场景6

| 对比项 | 场景4 (超长文字) | 场景6 (多数据项) |
|-------|----------------|-----------------|
| 触发条件 | 字符 ≥ 50 | 数据项 ≥ 15 |
| rotate | -Math.PI/2 | -Math.PI/2 |
| truncateAt | 6 | 6 |
| columnWidthRatio | 0.5 | **0.6** |
| columnStyle.radius | [4,4,0,0] | **[3,3,0,0]** |
| label | 显示 | **不显示** |

### 场景6的额外优化
1. **更窄的柱体**: `columnWidthRatio: 0.6` 而不是 0.5
2. **更小的圆角**: `[3,3,0,0]` 而不是 `[4,4,0,0]`
3. **不显示数据标签**: `label: false` 避免拥挤

---

## 4. 数据项数量与配置关系

| 数据项数量 | 角度 | 截断 | 柱宽 |
|-----------|------|------|------|
| ≤8 | 0° | 无 | 0.5 |
| 9-14 | -45° | 视情况 | 0.5 |
| **≥15** | **-90°** | **6** | **0.6** |

---

## 5. 空间利用分析

### 不同角度的横向占用
```
0° 水平:
  每个标签占用 ≈ 文字视觉宽度 × 字体大小
  例: "MacBook Pro" (10字符) ≈ 110px

45° 倾斜:
  每个标签占用 ≈ 文字长度 × cos(45°) × 字体大小
  例: "MacBook Pro" ≈ 78px

90° 垂直:
  每个标签占用 ≈ 字体大小 ≈ 11px
```

### 容纳能力对比 (800px宽度)
| 角度 | 每项占用 | 可容纳数量 |
|------|---------|-----------|
| 0° | ~80px | ~10项 |
| 45° | ~60px | ~13项 |
| 90° | ~30px | ~27项 |

---

## 6. 数据标签处理

### 多数据项时不显示标签
```javascript
// 数据项多时关闭标签
label: data.length >= 15 ? false : {
    position: 'top',
    style: { fill: '#5B8FF9', fontSize: 10 },
}
```

### 原因
- 20个柱体显示20个标签会非常拥挤
- 用户可通过Tooltip查看具体数值
- 提升视觉整洁度

---

## 7. 边界情况

| 情况 | 数据项 | 处理 |
|-----|-------|-----|
| 边界下 | 14 | 45° |
| 边界上 | 15 | 90° |
| 大量数据 | 30+ | 90° |
| 短文字+多数据 | 20 | 90° |

---

## 8. 完整示例代码

```javascript
import { Column } from '@ant-design/charts';

const data = [/* 20项数据 */];

const isManyItems = data.length >= 15;

const config = {
    data,
    xField: 'product',
    yField: 'value',
    // 多数据项时更窄的柱体
    columnWidthRatio: isManyItems ? 0.6 : 0.5,
    columnStyle: {
        radius: isManyItems ? [3, 3, 0, 0] : [4, 4, 0, 0],
    },
    xAxis: {
        label: {
            autoRotate: false,
            rotate: isManyItems ? -Math.PI / 2 : -Math.PI / 4,
            formatter: (text) => {
                const maxLen = isManyItems ? 6 : 8;
                if (text.length > maxLen) {
                    return text.substring(0, maxLen) + '...';
                }
                return text;
            },
            style: {
                fontSize: 11,
                fill: '#646A73',
                textAlign: 'end',
            },
        },
    },
    // 多数据项时不显示标签
    label: isManyItems ? false : {
        position: 'top',
        style: { fill: '#5B8FF9', fontSize: 10 },
    },
    tooltip: {
        formatter: (datum) => ({
            name: datum.product,
            value: datum.value.toLocaleString() + ' 元',
        }),
    },
};

return <Column {...config} />;
```

---

## 9. 文件结构

```
06-many-items/
├── index.html    # 多数据项演示
└── spec.md       # 本设计规范文档
```
