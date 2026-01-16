# 真实场景 - 产品销量排行设计规范

## 场景标识
- **场景编号**: 05
- **场景名称**: 真实业务场景综合示例
- **特点**: 展示完整的图表组件和智能配置方案

---

## 1. SmartXAxis 智能配置器

### 完整代码
```javascript
/**
 * 计算字符串的视觉宽度
 * 中文字符算2个单位，英文/数字算1个单位
 */
function getVisualWidth(str) {
    let width = 0;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode >= 0x4E00 && charCode <= 0x9FFF ||  // CJK汉字
            charCode >= 0x3000 && charCode <= 0x303F ||  // CJK标点
            charCode >= 0xFF00 && charCode <= 0xFFEF) {  // 全角字符
            width += 2;
        } else {
            width += 1;
        }
    }
    return width;
}

/**
 * SmartXAxis - 智能X轴配置生成器
 * 根据数据自动选择最优的旋转角度和截断策略
 */
const SmartXAxis = {
    getConfig(data, xField, options = {}) {
        const {
            maxTruncate = 8,         // 45°时的截断长度
            minTruncate = 6,         // 90°时的截断长度
            manyItemThreshold = 15,  // 多数据项阈值
        } = options;

        // 计算最大视觉宽度和数据项数量
        const maxWidth = Math.max(...data.map(d => 
            getVisualWidth(String(d[xField] || ''))
        ));
        const count = data.length;

        let rotate, truncateAt;

        // 智能判断逻辑
        if (maxWidth <= 4 && count <= 8) {
            // 场景1: 短文字，水平显示
            rotate = 0;
            truncateAt = null;
        } else if (maxWidth <= 8 && count <= 12) {
            // 场景2: 中等文字，45°不截断
            rotate = -Math.PI / 4;
            truncateAt = null;
        } else if (maxWidth >= 50 || count >= manyItemThreshold) {
            // 场景4/6: 超长文字或多数据项，90°+截断6
            rotate = -Math.PI / 2;
            truncateAt = minTruncate;
        } else {
            // 场景3: 长文字，45°+截断8
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
                    textAlign: rotate === 0 ? 'center' : 'end',
                },
            },
        };
    },
};
```

---

## 2. 判断流程

```
输入: data[], xField
        ↓
计算: maxWidth = max(visualWidth)
      count = data.length
        ↓
┌─────────────────────────────────────┐
│ maxWidth ≤ 4 && count ≤ 8 ?        │
│ → YES: 场景1 (水平, rotate=0)       │
│ → NO: ↓                             │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│ maxWidth ≤ 8 && count ≤ 12 ?       │
│ → YES: 场景2 (45°, 不截断)          │
│ → NO: ↓                             │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│ maxWidth ≥ 50 || count ≥ 15 ?      │
│ → YES: 场景4/6 (90°, 截断6)         │
│ → NO: ↓                             │
└─────────────────────────────────────┘
        ↓
默认: 场景3 (45°, 截断8)
```

---

## 3. 使用方式

### 基本用法
```javascript
import { Column } from '@ant-design/charts';

const data = [
    { product: 'MacBook Pro 16英寸', value: 120000 },
    { product: 'iPhone 15 Pro Max', value: 72000 },
];

const config = {
    data,
    xField: 'product',
    yField: 'value',
    // 一行代码自动配置X轴
    xAxis: SmartXAxis.getConfig(data, 'product'),
};

return <Column {...config} />;
```

### 自定义参数
```javascript
xAxis: SmartXAxis.getConfig(data, 'product', {
    maxTruncate: 10,        // 45°截断10字符
    minTruncate: 8,         // 90°截断8字符
    manyItemThreshold: 20,  // 20项触发90°
})
```

---

## 4. 完整图表元素

### 必需元素
| 元素 | 位置 | 说明 |
|-----|------|-----|
| 标题 | 卡片头部 | 简洁描述图表内容 |
| X轴标签 | 底部 | SmartXAxis 自动处理 |
| Y轴标签 | 左侧 | 数值格式化 |
| 柱体 | 主体区域 | 数据可视化 |

### 可选元素
| 元素 | 位置 | 说明 |
|-----|------|-----|
| 元信息 | 标题下方 | 数据源、筛选条件 |
| Y轴单位 | 左上角 | 如"万元" |
| 图例 | 右上角 | 多系列时显示 |
| 数据标签 | 柱顶 | 显示具体数值 |
| 汇总栏 | 底部 | 总计、平均等 |

---

## 5. 配置参数速查

### SmartXAxis.getConfig() 参数
| 参数 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| data | Array | 必需 | 数据数组 |
| xField | string | 必需 | X轴字段名 |
| options.maxTruncate | number | 8 | 45°截断长度 |
| options.minTruncate | number | 6 | 90°截断长度 |
| options.manyItemThreshold | number | 15 | 多数据项阈值 |

### 返回值结构
```javascript
{
    label: {
        autoRotate: false,
        rotate: number,        // 0, -π/4, 或 -π/2
        formatter: Function,   // 截断函数或原样返回
        style: {
            fontSize: 11,
            fill: '#646A73',
            textAlign: 'center' | 'end',
        },
    },
}
```

---

## 6. 场景判断速查表

| maxWidth | count | 场景 | rotate | truncate |
|----------|-------|------|--------|----------|
| ≤4 | ≤8 | 1 | 0 | 无 |
| ≤8 | ≤12 | 2 | -π/4 | 无 |
| ≥50 | 任意 | 4 | -π/2 | 6 |
| 任意 | ≥15 | 6 | -π/2 | 6 |
| 其他 | <15 | 3 | -π/4 | 8 |

---

## 7. 文件结构

```
05-real-scenario/
├── index.html    # 完整业务场景演示
└── spec.md       # 本设计规范文档
```
