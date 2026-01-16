# 长文字45度+截断设计规范

## 场景标识
- **场景编号**: 03
- **场景名称**: 长文字45度+截断
- **适用条件**: 视觉宽度 > 8 且 < 50，数据项 < 15

---

## 1. 触发条件

### 判断逻辑
```javascript
function shouldUseTruncate45(data, xField) {
    const maxWidth = Math.max(...data.map(d => getVisualWidth(String(d[xField]))));
    const count = data.length;
    
    // 超过中等范围，但不到超长范围
    return maxWidth > 8 && maxWidth < 50 && count < 15;
}
```

### 条件判断表
| 条件 | 阈值 | 说明 |
|-----|------|-----|
| 最大视觉宽度 | > 8 且 < 50 | 长但不超长 |
| 数据项数量 | < 15 | 少于15项 |
| 截断长度 | 8 字符 | 显示前8字符 + "..." |

### 适用数据示例
| 标签 | 字符数 | 截断后 | 是否适用 |
|-----|-------|-------|---------|
| iPhone 15 Pro | 13 | iPhone 1... | ✓ |
| MacBook Air M2 | 14 | MacBook ... | ✓ |
| 华为 Mate 60 Pro | 14 | 华为 Mate... | ✓ |
| Q1 | 2 | Q1 | ✗ (太短) |

---

## 2. 截断配置

### formatter 函数
```javascript
formatter: (text) => {
    const maxLength = 8;  // 截断长度
    const str = String(text || '');
    
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    }
    return str;
}
```

### 截断长度选择
| 场景 | 截断长度 | 原因 |
|-----|---------|-----|
| 45° 倾斜 | 8 字符 | 最佳信息保留与空间平衡 |
| 90° 垂直 | 6 字符 | 垂直空间更紧凑 |

### 截断效果对照
| 原始文字 | 字符数 | 截断结果 |
|---------|-------|---------|
| iPhone 15 Pro | 13 | iPhone 1... |
| MacBook Air M2 | 14 | MacBook ... |
| iPad Pro | 8 | iPad Pro (不截断) |
| AirPods | 7 | AirPods (不截断) |

---

## 3. X轴完整配置

```javascript
xAxis: {
    label: {
        autoRotate: false,
        rotate: -Math.PI / 4,  // -45度
        formatter: (text) => {
            const maxLength = 8;
            const str = String(text || '');
            if (str.length > maxLength) {
                return str.substring(0, maxLength) + '...';
            }
            return str;
        },
        style: {
            fontSize: 11,
            fill: '#646A73',
            textAlign: 'end',
        },
    },
}
```

---

## 4. Tooltip 配置（关键）

### 为什么Tooltip要显示完整文字
1. 用户需要知道完整信息
2. 截断仅为节省显示空间
3. 交互时应提供完整数据

### Tooltip 配置
```javascript
tooltip: {
    formatter: (datum) => ({
        name: datum.product,  // 使用原始字段值，不是formatter处理后的
        value: datum.value.toLocaleString() + ' 万元',
    }),
}
```

### 重要提示
```
⚠️ formatter 只影响 X轴标签显示
⚠️ Tooltip 使用原始数据对象 (datum)
⚠️ 两者互不影响
```

---

## 5. 为什么选择8个字符？

### 信息保留分析
| 截断长度 | 信息保留率 | 可辨识性 | 推荐度 |
|---------|-----------|---------|-------|
| 4 | ~30% | 差 | ❌ |
| 6 | ~45% | 一般 | 90°用 |
| **8** | ~60% | 好 | ✓ 45°用 |
| 10 | ~75% | 很好 | 空间不足时不推荐 |

### 典型产品名截断效果
```
原始: "iPhone 15 Pro Max"
截断4: "iPho..." ← 无法辨识
截断6: "iPhone..." ← 勉强可辨识
截断8: "iPhone 1..." ← 能辨识是iPhone 15系列
```

---

## 6. 边界情况

| 情况 | 字符数 | 处理 |
|-----|-------|-----|
| 刚好8字符 | 8 | 不截断 |
| 9字符 | 9 | 截断到8 + "..." |
| 空字符串 | 0 | 返回空串 |
| null/undefined | - | 转为空串处理 |
| 字符≥50 | 50+ | 切换到场景4 (90°) |
| 数据项≥15 | - | 切换到场景6 |

---

## 7. 与其他场景的关系

```
判断流程:
                    ↓
┌─────────────────────────────────┐
│ maxWidth ≤ 4 && count ≤ 8 ?    │
│   YES → 场景1: 水平显示         │
│   NO  ↓                         │
└─────────────────────────────────┘
                    ↓
┌─────────────────────────────────┐
│ maxWidth ≤ 8 && count ≤ 12 ?   │
│   YES → 场景2: 45°不截断        │
│   NO  ↓                         │
└─────────────────────────────────┘
                    ↓
┌─────────────────────────────────┐
│ maxWidth < 50 && count < 15 ?  │
│   YES → 场景3: 45°+截断 ←当前   │
│   NO  ↓                         │
└─────────────────────────────────┘
                    ↓
        场景4 (90°) 或 场景6
```

---

## 8. 完整示例代码

```javascript
import { Column } from '@ant-design/charts';

const data = [
    { product: 'iPhone 15 Pro', value: 72000 },
    { product: 'MacBook Air M2', value: 45000 },
    { product: 'iPad Pro 12.9', value: 38000 },
];

const truncate = (text, maxLength = 8) => {
    const str = String(text || '');
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    }
    return str;
};

const config = {
    data,
    xField: 'product',
    yField: 'value',
    xAxis: {
        label: {
            autoRotate: false,
            rotate: -Math.PI / 4,
            formatter: (text) => truncate(text, 8),
            style: {
                fontSize: 11,
                fill: '#646A73',
                textAlign: 'end',
            },
        },
    },
    tooltip: {
        formatter: (datum) => ({
            name: datum.product,  // 完整显示
            value: datum.value.toLocaleString() + ' 万元',
        }),
    },
};

return <Column {...config} />;
```

---

## 9. 文件结构

```
03-long-text/
├── index.html    # 可视化展示页面
└── spec.md       # 本设计规范文档
```
