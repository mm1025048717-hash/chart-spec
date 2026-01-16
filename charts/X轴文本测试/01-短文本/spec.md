# 短文字水平显示设计规范

## 场景标识
- **场景编号**: 01
- **场景名称**: 短文字水平显示
- **适用条件**: 视觉宽度 ≤ 4 且 数据项 ≤ 8

---

## 1. 触发条件

### 判断逻辑
```javascript
function shouldUseHorizontal(data, xField) {
    const maxWidth = Math.max(...data.map(d => getVisualWidth(String(d[xField]))));
    const count = data.length;
    return maxWidth <= 4 && count <= 8;  // 两个条件同时满足
}
```

### 视觉宽度计算规则
| 字符类型 | 视觉宽度 | 示例 |
|---------|---------|------|
| 中文字符 | 2 | "华" → 2 |
| 英文字母 | 1 | "A" → 1 |
| 数字 | 1 | "1" → 1 |
| 全角字符 | 2 | "，" → 2 |
| 半角标点 | 1 | "," → 1 |

### 适用数据示例
| 标签 | 视觉宽度 | 是否适用 |
|-----|---------|---------|
| 华东 | 4 | ✓ |
| Q1 | 2 | ✓ |
| 1月 | 3 | ✓ |
| Jan | 3 | ✓ |
| 华东地区 | 8 | ✗ (超过4) |

---

## 2. X轴配置参数

### 完整配置
```javascript
xAxis: {
    label: {
        autoRotate: false,      // 禁用自动旋转
        rotate: 0,              // 水平显示
        formatter: (text) => text,  // 不截断
        style: {
            fontSize: 11,
            fill: '#646A73',
            textAlign: 'center',  // 居中对齐
            textBaseline: 'top',
        },
    },
    line: {
        style: {
            stroke: '#E5E6EB',
            lineWidth: 1,
        },
    },
    tickLine: {
        style: {
            stroke: '#E5E6EB',
            lineWidth: 1,
        },
        length: 4,
    },
}
```

### 参数说明
| 参数 | 值 | 说明 |
|-----|---|-----|
| `rotate` | `0` | 0弧度 = 水平 |
| `autoRotate` | `false` | 禁用G2的自动旋转 |
| `textAlign` | `'center'` | 水平时居中对齐 |
| `fontSize` | `11` | 标签字体大小 |
| `fill` | `'#646A73'` | 标签文字颜色 |

---

## 3. 柱体配置

```javascript
{
    color: '#5B8FF9',           // 主题蓝色
    columnWidthRatio: 0.5,      // 柱体宽度占比
    columnStyle: {
        radius: [4, 4, 0, 0],   // 仅顶部圆角
    },
}
```

---

## 4. 数据标签配置

```javascript
label: {
    position: 'top',           // 标签位于柱体顶部
    style: {
        fill: '#5B8FF9',       // 与柱体同色
        fontSize: 11,
    },
    formatter: (datum) => datum.value.toLocaleString(),
}
```

---

## 5. Tooltip配置

```javascript
tooltip: {
    formatter: (datum) => ({
        name: datum.region,    // 完整显示名称
        value: datum.value.toLocaleString() + ' 万元',
    }),
}
```

---

## 6. 边界情况处理

| 情况 | 处理方式 | 原因 |
|-----|---------|-----|
| 数据项 = 8 | 使用水平 | 8是包含边界值 |
| 数据项 = 9 | 切换45° | 超出阈值 |
| 视觉宽度 = 4 | 使用水平 | 4是包含边界值 |
| 视觉宽度 = 5 | 切换45° | 超出阈值 |
| 空字符串 | 视为宽度0 | 不影响判断 |
| null/undefined | 转为空串 | 使用 String() 转换 |

---

## 7. 设计原则

1. **可读性优先**: 短文字水平显示阅读体验最佳
2. **空间利用**: 数据项少时充分利用横向空间
3. **一致性**: 同一图表内所有标签统一处理
4. **降级策略**: 超出条件时自动降级到45°倾斜

---

## 8. 与其他场景的关系

```
判断流程:
┌─────────────────────────────────────────┐
│ 1. 计算最大视觉宽度 maxWidth            │
│ 2. 统计数据项数量 count                 │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ maxWidth ≤ 4 && count ≤ 8 ?            │
│   YES → 场景1: 水平显示                 │
│   NO  → 继续判断                        │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ maxWidth ≤ 8 && count ≤ 12 ?           │
│   YES → 场景2: 45°倾斜                  │
│   NO  → 继续判断                        │
└─────────────────────────────────────────┘
```

---

## 9. 文件结构

```
01-short-text/
├── index.html    # 可视化展示页面
└── spec.md       # 本设计规范文档
```
