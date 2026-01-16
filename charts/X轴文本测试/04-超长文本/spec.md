# 超长文字90度+截断设计规范

## 场景标识
- **场景编号**: 04
- **场景名称**: 超长文字90度垂直+截断
- **适用条件**: 字符数 ≥ 50

---

## 1. 触发条件

### 判断逻辑
```javascript
function shouldUse90Degree(data, xField) {
    const maxLen = Math.max(...data.map(d => String(d[xField] || '').length));
    return maxLen >= 50;  // 字符数 ≥ 50
}
```

### 条件判断表
| 条件 | 阈值 | 说明 |
|-----|------|-----|
| 最大字符数 | ≥ 50 | 超长文字触发 |
| 或 数据项数量 | ≥ 15 | 多数据项触发（见场景6） |
| 截断长度 | 6 字符 | 比45°少2字符 |

---

## 2. 为什么用90度？

### 空间效率分析
```
45° 倾斜文字:
    ╲
     ╲MacBook P...
      ╲
       │
       ▼
   占用横向空间 ≈ 文字长度 × cos(45°) ≈ 0.71 × 长度

90° 垂直文字:
    │
    │MacBo...
    │
    │
    ▼
   占用横向空间 ≈ 字体大小 ≈ 11px
```

### 何时必须用90度
1. **文字超长** (≥50字符): 45°倾斜会占用过多空间
2. **数据项过多** (≥15项): 需要最大化横向空间利用

---

## 3. 截断长度：为什么是6？

### 与45°场景的对比
| 场景 | 角度 | 截断长度 | 原因 |
|-----|------|---------|-----|
| 场景3 | 45° | 8字符 | 倾斜文字更易阅读 |
| 场景4 | 90° | 6字符 | 垂直文字需要更紧凑 |

### 截断效果
| 原始文字 | 45°截断(8) | 90°截断(6) |
|---------|-----------|-----------|
| MacBook Pro 16... | MacBook ... | MacBoo... |
| iPhone 15 Pro... | iPhone 1... | iPhone... |

---

## 4. X轴完整配置

```javascript
xAxis: {
    label: {
        autoRotate: false,
        rotate: -Math.PI / 2,  // -90度
        formatter: (text) => {
            const maxLength = 6;  // 截断到6字符
            const str = String(text || '');
            if (str.length > maxLength) {
                return str.substring(0, maxLength) + '...';
            }
            return str;
        },
        style: {
            fontSize: 11,
            fill: '#646A73',
            textAlign: 'end',  // 垂直时也用end
        },
    },
}
```

---

## 5. 弧度制说明

### 角度转换
```
90° = π/2 弧度

计算: 90 × (π / 180) = π/2 ≈ 1.5708

配置时使用: -Math.PI / 2 (负号表示逆时针)
```

### 常用角度对照
| 角度 | 弧度 | Math表达式 |
|-----|------|-----------|
| 0° | 0 | 0 |
| -45° | -π/4 | -Math.PI/4 |
| -90° | -π/2 | -Math.PI/2 |
| -180° | -π | -Math.PI |

---

## 6. 45° vs 90° 详细对比

| 对比项 | 45° 倾斜 | 90° 垂直 |
|-------|---------|---------|
| rotate | -Math.PI/4 | -Math.PI/2 |
| 截断长度 | 8字符 | 6字符 |
| 触发条件 | 8 < 字符 < 50 | 字符 ≥ 50 |
| 可读性 | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 空间效率 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| X轴高度 | ~65px | ~90px |

---

## 7. 边界情况

| 情况 | 字符数 | 处理 |
|-----|-------|-----|
| 边界下 | 49 | 45° + 截断8 |
| 边界上 | 50 | 90° + 截断6 |
| 超长 | 100+ | 90° + 截断6 |
| 空值 | 0 | 返回空串 |

---

## 8. 与场景6的关系

### 两种触发90度的条件
```
触发条件1: 字符数 ≥ 50 → 场景4 (本场景)
触发条件2: 数据项 ≥ 15 → 场景6

两者配置相同，只是触发原因不同
```

### 优先级判断
```javascript
function getXAxisConfig(data, xField) {
    const maxLen = Math.max(...data.map(d => String(d[xField]).length));
    const count = data.length;
    
    // 超长文字或多数据项都使用90度
    if (maxLen >= 50 || count >= 15) {
        return {
            rotate: -Math.PI / 2,
            truncateAt: 6,
        };
    }
    // ... 其他场景
}
```

---

## 9. 完整示例代码

```javascript
import { Column } from '@ant-design/charts';

const data = [
    { product: 'MacBook Pro 16英寸 M3 Max 顶配版（定制版 96GB 内存 + 8TB SSD）', value: 120000 },
    { product: 'iPhone 15 Pro Max 钛金属 1TB 蓝色（首发限量定制版）', value: 72000 },
];

const truncate = (text, maxLength = 6) => {
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
            rotate: -Math.PI / 2,  // 90度
            formatter: (text) => truncate(text, 6),  // 截断到6
            style: {
                fontSize: 11,
                fill: '#646A73',
                textAlign: 'end',
            },
        },
    },
    tooltip: {
        formatter: (datum) => ({
            name: datum.product,
            value: datum.value.toLocaleString() + ' 万元',
        }),
    },
};

return <Column {...config} />;
```

---

## 10. 文件结构

```
04-very-long-text/
├── index.html    # 可视化展示页面
└── spec.md       # 本设计规范文档
```
