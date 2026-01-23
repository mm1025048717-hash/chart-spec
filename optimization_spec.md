# 亿问 2.0 图表设计规范 (Ant Design Chart)

## 1. 技术栈
- **图表库**：Ant Design Chart (G2Plot)
- **UI框架**：Ant Design
- **文档**：https://charts.ant.design/

---

## 2. DataAgent 产品尺寸规范

### 2.1 图表容器尺寸

| 场景 | 宽度 | 高度 | 说明 |
|------|------|------|------|
| 全宽卡片 | `100%` | `400px` | 默认图表高度 |
| 半宽卡片 | `50%` | `320px` | 并排展示时 |
| 小型图表 | `100%` | `240px` | 指标卡内嵌图表 |
| 大型图表 | `100%` | `500px` | 详情页主图表 |

### 2.2 内边距规范

| 元素 | 内边距 | CSS值 |
|------|--------|-------|
| 图表容器 | 四周 | `padding: 20px` |
| 图表主体 | 上 | `40px`（图例区域） |
| 图表主体 | 下 | `50px`（X轴标签） |
| 图表主体 | 左 | `50px`（Y轴标签） |
| 图表主体 | 右 | `20px` |

### 2.3 G2Plot padding 配置

```javascript
// 标准配置
padding: [40, 20, 50, 50]  // [上, 右, 下, 左]

// 双Y轴图表
padding: [40, 50, 50, 50]  // 右侧留出Y轴空间

// 无图例图表
padding: [20, 20, 50, 50]

// 紧凑模式
padding: [20, 16, 40, 40]
```

---

## 3. 坐标轴规范

### 3.1 X轴配置

| 参数 | 数值 | 说明 |
|------|------|------|
| `label.style.fontSize` | `11px` | 标签字号 |
| `label.style.fill` | `#86868B` | 标签颜色 |
| `label.style.textAlign` | `center` / `end` | 水平时居中，旋转时右对齐 |
| `label.autoRotate` | `false` | 禁用自动旋转，使用智能策略 |
| `line.style.stroke` | `#E8E8ED` | 轴线颜色 |
| `tickLine` | `null` | 隐藏刻度线 |
| `title` | `null` | 通常隐藏标题 |

#### X轴旋转策略

| 场景 | rotate 值 | textAlign | 说明 |
|------|-----------|-----------|------|
| 短文本 (≤4字符) | `0` | `center` | 水平显示 |
| 中等文本 (5-8字符) | `-Math.PI / 4` | `end` | 45°倾斜 |
| 长文本 (>8字符) | `-Math.PI / 4` | `end` | 45°倾斜 + 截断 |
| 超长文本或项数≥15 | `-Math.PI / 2` | `end` | 90°垂直 + 截断 |

```javascript
xAxis: {
    label: {
        autoRotate: false,
        rotate: -Math.PI / 4,  // 45度
        style: {
            fontSize: 11,
            fill: '#86868B',
            textAlign: 'end',  // 旋转时必须设置
        },
        formatter: (text) => text.length > 8 ? text.slice(0, 8) + '...' : text,
    },
    line: { style: { stroke: '#E8E8ED' } },
    tickLine: null,
}
```

### 3.2 Y轴配置

| 参数 | 数值 | 说明 |
|------|------|------|
| `label.style.fontSize` | `11px` | 标签字号 |
| `label.style.fill` | `#86868B` | 标签颜色 |
| `grid.line.style.stroke` | `#E8E8ED` | 网格线颜色 |
| `grid.line.style.lineDash` | `[4, 4]` | 虚线样式 |
| `line` | `null` | 隐藏Y轴线 |
| `tickLine` | `null` | 隐藏刻度线 |
| `title` | `null` | 通常隐藏标题 |

```javascript
yAxis: {
    label: {
        style: { fontSize: 11, fill: '#86868B' },
        formatter: (v) => v >= 10000 ? (v / 10000).toFixed(1) + '万' : v.toLocaleString(),
    },
    grid: {
        line: {
            style: { stroke: '#E8E8ED', lineDash: [4, 4] },
        },
    },
    line: null,
    tickLine: null,
}
```

### 3.3 双Y轴配置

```javascript
yAxis: {
    sales: {
        position: 'left',
        label: {
            formatter: (v) => v.toLocaleString(),
            style: { fontSize: 11, fill: '#86868B' },
        },
        grid: { line: { style: { stroke: '#E8E8ED', lineDash: [4, 4] } } },
    },
    rate: {
        position: 'right',
        label: {
            formatter: (v) => v + '%',
            style: { fontSize: 11, fill: '#86868B' },
        },
        grid: null,  // 右侧Y轴不显示网格线
        min: 0,
        max: 100,
    },
}
```

---

## 4. Y轴单位标签（左上角）

| 参数 | 数值 |
|------|------|
| 位置 | 图表左上角 |
| 背景色 | `#F5F5F7` |
| 字号 | `12px` |
| 字色 | `#86868B` |
| 内边距 | `2px 8px` |
| 圆角 | `2px` |
| 内容 | 如"万元"、"%" 等 |

```html
<div class="axis-unit y-left">万元</div>
```

---

## 5. X轴字段标签（右下角）

| 参数 | 数值 |
|------|------|
| 位置 | 图表右下角 |
| 背景色 | `#F5F5F7` |
| 字号 | `12px` |
| 字色 | `#86868B` |
| 内边距 | `4px 10px` |
| 圆角 | `2px` |
| 用途 | 说明X轴分组字段来源 |

```html
<div class="x-field-label">按门店</div>
```

---

## 6. 图例规范

### 6.1 位置与布局

| 参数 | 数值 |
|------|------|
| 位置 | `top-right` |
| 项间距 | `gap: 20px` |
| 图标与文字间距 | `6px` |
| 字号 | `12px` |
| 字色 | `#1D1D1F` |

### 6.2 图例图标样式

| 类型 | 形状 | 尺寸 |
|------|------|------|
| 柱状图 | 方形 | `10×10px`, `radius: 2px` |
| 折线图 | 横线 | `16×2px`, `radius: 1px` |
| 折线图(带点) | 横线+圆点 | `16×2px` + `6×6px` 圆点 |
| 饼图/散点图 | 圆形 | `10×10px` |

### 6.3 系列颜色

| 顺序 | 色值 | 用途 |
|------|------|------|
| 1 | `#0071E3` | 蓝色 - 主要指标 |
| 2 | `#34C759` | 绿色 - 次要指标/达成率 |
| 3 | `#FF9500` | 黄色 - 第三系列 |
| 4 | `#FF3B30` | 红色 - 第四系列 |
| 5 | `#9270CA` | 紫色 - 第五系列 |
| 6 | `#6DC8EC` | 青色 - 第六系列 |
| 7 | `#FF9845` | 橙色 - 第七系列 |

```javascript
legend: {
    position: 'top-right',
    itemSpacing: 20,
    itemName: {
        style: { fontSize: 12, fill: '#1D1D1F' },
    },
    marker: {
        symbol: 'square',  // 或 'line', 'circle'
        style: { r: 5 },
    },
}
```

---

## 7. 图表元素规范

### 7.1 柱体规范

| 参数 | 数值 | 说明 |
|------|------|------|
| 主色 | `#0071E3` | 单系列默认色 |
| 宽度比例 | `0.5` | `columnWidthRatio` |
| 圆角 | `[4, 4, 0, 0]` | 仅顶部圆角 |
| 分组间距 | `0.25` | `marginRatio`（分组图） |
| 最小宽度 | `8px` | 项数多时的最小宽度 |
| 最大宽度 | `48px` | 项数少时的最大宽度 |

```javascript
columnWidthRatio: 0.5,
columnStyle: {
    radius: [4, 4, 0, 0],
},
// 项数多时收窄
columnWidthRatio: data.length > 12 ? 0.6 : 0.5,
```

### 7.2 条形图规范

| 参数 | 数值 | 说明 |
|------|------|------|
| 主色 | `#0071E3` | 单系列默认色 |
| 高度比例 | `0.5` | `barWidthRatio` |
| 圆角 | `[0, 4, 4, 0]` | 仅右侧圆角 |

### 7.3 折线规范

| 参数 | 数值 | 说明 |
|------|------|------|
| 线宽 | `2px` | `lineStyle.lineWidth` |
| 数据点大小 | `4px` | `point.size` |
| 平滑曲线 | `false` | `smooth`（默认折线） |
| 数据点形状 | `circle` | 圆形数据点 |

### 7.4 面积图规范

| 参数 | 数值 | 说明 |
|------|------|------|
| 填充透明度 | `0.3` | `areaStyle.fillOpacity` |
| 边界线宽 | `2px` | `line.style.lineWidth` |
| 平滑曲线 | `true` | 面积图通常使用平滑 |

### 7.5 饼图规范

| 参数 | 数值 | 说明 |
|------|------|------|
| 外半径 | `0.8` | `radius` |
| 内半径 (环形图) | `0.6` | `innerRadius` |
| 标签类型 | `outer` | 外部标签 |
| 标签格式 | `{name} {percentage}` | 名称 + 百分比 |

---

## 8. 数据标签规范

| 参数 | 数值 | 说明 |
|------|------|------|
| 字号 | `11px` | 标签字号 |
| 字色 | 与系列色一致 | 如 `#0071E3` |
| 位置（柱状图） | `top` | 柱体上方 |
| 位置（条形图） | `right` | 条形右侧 |
| 位置（折线图） | `top` | 数据点上方 |
| 偏移量 | `8px` | 与图形元素的距离 |

```javascript
label: {
    position: 'top',
    offset: 8,
    style: {
        fontSize: 11,
        fill: '#0071E3',
    },
    formatter: (datum) => datum.value.toLocaleString(),
}
```

---

## 9. 间距与尺寸汇总

### 9.1 标准间距

| 元素 | 间距值 | 说明 |
|------|--------|------|
| 卡片内边距 | `16-20px` | 图表容器内边距 |
| 标题与图表 | `16px` | 头部区域下边距 |
| 图例间距 | `20px` | 图例项之间 |
| 图例图标与文字 | `6px` | 图标右侧 |
| Y轴标签与轴线 | `8px` | 标签右边距 |
| X轴标签与轴线 | `8px` | 标签上边距 |
| 数据标签与图形 | `8px` | label offset |

### 9.2 字号规范

| 元素 | 字号 | 字重 |
|------|------|------|
| 卡片标题 | `15px` | 600 |
| 轴标签 | `11px` | 400 |
| 图例文字 | `12px` | 400 |
| 数据标签 | `11px` | 400 |
| 轴单位标签 | `12px` | 400 |
| Tooltip标题 | `13px` | 600 |
| Tooltip内容 | `12px` | 400 |

---

## 10. Tooltip 配置

```javascript
tooltip: {
    showTitle: true,
    title: (title) => `${title}`,
    formatter: (datum) => ({
        name: datum.seriesField || datum.xField,
        value: datum.yField.toLocaleString() + ' 万元',
    }),
    domStyles: {
        'g2-tooltip': {
            padding: '12px 16px',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        'g2-tooltip-title': {
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '8px',
        },
    },
}
```

---

## 11. 动画配置

```javascript
animation: {
    appear: {
        animation: 'scale-in-y',
        duration: 400,
        easing: 'easeQuadOut',
    },
    update: {
        animation: 'fade-in',
        duration: 300,
    },
}
```

---

## 12. 卡片容器规范

| 参数 | 数值 |
|------|------|
| 背景色 | `#FFFFFF` |
| 边框 | `1px solid #E8E8ED` |
| 圆角 | `12px` |
| 图表高度 | `400px` |
| 内边距 | `16px` |

---

## 13. 底部汇总栏

| 参数 | 数值 |
|------|------|
| 内边距 | `12px 16px` |
| 字号 | `13px` |
| 字色 | `#86868B` |
| 对齐 | 居中 |
| 分隔线 | `1px solid #E8E8ED` |

---

## 14. 多指标图表类型选择规则

### 14.1 Ant Charts 双轴限制说明

**重要限制**：Ant Charts 的双轴图（DualAxes）不支持同时使用两个柱状图。

| 限制项 | 说明 |
|--------|------|
| 双轴柱状图 | ❌ 不支持两个柱状图同时使用 |
| 柱状图 + 折线图 | ✅ 支持（最常用组合） |
| 分组柱状图 | ✅ 支持（但使用同一个 Y 轴，数据量级差别大时显示效果不佳） |
| 分组柱状图 + 分组折线图 | ✅ 支持（可放在一张图上） |

**解决方案**：
- 当需要展示两个不同量级的指标时，使用 **柱状图 + 折线图** 的组合
- 当两个指标量级相近时，可以使用 **分组柱状图**（共用 Y 轴）
- 点击图例可以隐藏/显示系列，Y 轴会自动适配

### 14.2 数字格式类型

系统支持三种数字格式：

| 格式类型 | 说明 | 示例 |
|----------|------|------|
| `currency` | 货币格式 | 销售额、金额等（单位：万元、亿元等） |
| `number(int)` | 整数格式 | 销售量、数量、人数等 |
| `percentage` | 百分比格式 | 增长率、转化率、占比等 |

### 14.3 图表类型选择规则

#### 规则 1：三者有其二的情况

当只有两种数字格式时：

| 组合 | 图表类型分配 | 说明 |
|------|-------------|------|
| `currency` + `number(int)` | `currency` → 柱状图<br>`number(int)` → 折线图 | currency 优先使用柱状图 |
| `currency` + `percentage` | `currency` → 柱状图<br>`percentage` → 折线图 | currency 优先使用柱状图 |
| `number(int)` + `percentage` | `number(int)` → 柱状图<br>`percentage` → 折线图 | number(int) 优先使用柱状图 |

**优先级**：`currency` > `number(int)` > `percentage`

#### 规则 2：三者都有的情况

当三种数字格式都存在时：

| 指标 | 图表类型 | Y 轴 |
|------|---------|------|
| `currency` | 柱状图 | 左侧 Y 轴（共用） |
| `number(int)` | 柱状图 | 左侧 Y 轴（共用） |
| `percentage` | 折线图 | 右侧 Y 轴 |

**说明**：
- `currency` 和 `number(int)` 使用**分组柱状图**，共用左侧 Y 轴
- `percentage` 使用**折线图**，使用右侧 Y 轴
- ⚠️ **注意**：当 `currency` 和 `number(int)` 数据量级差别太大时，共用 Y 轴会导致显示效果不佳。此时可以通过点击图例隐藏其中一个系列，Y 轴会自动适配。

### 14.4 判断逻辑

**实现建议**：

```javascript
// 判断逻辑：currency、percentage、其他
function determineChartType(indicators) {
    const hasCurrency = indicators.some(ind => ind.format === 'currency');
    const hasPercentage = indicators.some(ind => ind.format === 'percentage');
    const hasNumber = indicators.some(ind => ind.format === 'number(int)');
    
    const formatCount = [hasCurrency, hasPercentage, hasNumber].filter(Boolean).length;
    
    if (formatCount === 2) {
        // 三者有其二
        if (hasCurrency && hasNumber) {
            return {
                currency: 'column',
                number: 'line'
            };
        }
        if (hasCurrency && hasPercentage) {
            return {
                currency: 'column',
                percentage: 'line'
            };
        }
        if (hasNumber && hasPercentage) {
            return {
                number: 'column',
                percentage: 'line'
            };
        }
    } else if (formatCount === 3) {
        // 三者都有
        return {
            currency: 'column',      // 分组柱状图，共用左侧Y轴
            number: 'column',         // 分组柱状图，共用左侧Y轴
            percentage: 'line'       // 折线图，右侧Y轴
        };
    }
    
    // 单一指标的情况
    return {
        [indicators[0].format]: 'column'
    };
}
```

### 14.5 使用示例

#### 示例 1：销售额（currency）+ 销售量（number）

```javascript
// 配置：销售额用柱状图，销售量用折线图
geometryOptions: [
    {
        geometry: 'column',
        yField: 'sales',  // currency
        color: '#5B8FF9',
    },
    {
        geometry: 'line',
        yField: 'volume',  // number(int)
        color: '#5AD8A6',
    },
],
yAxis: {
    sales: { position: 'left' },   // 左侧Y轴
    volume: { position: 'right' }, // 右侧Y轴
}
```

#### 示例 2：销售额（currency）+ 销售量（number）+ 增长率（percentage）

```javascript
// 配置：销售额和销售量用分组柱状图（共用左侧Y轴），增长率用折线图（右侧Y轴）
geometryOptions: [
    {
        geometry: 'column',
        yField: 'sales',  // currency
        seriesField: 'type',
        color: '#5B8FF9',
    },
    {
        geometry: 'column',
        yField: 'volume',  // number(int)
        seriesField: 'type',
        color: '#5AD8A6',
    },
    {
        geometry: 'line',
        yField: 'growth',  // percentage
        color: '#F6BD16',
    },
],
yAxis: {
    sales: { position: 'left' },    // 左侧Y轴（共用）
    volume: { position: 'left' },   // 左侧Y轴（共用）
    growth: { position: 'right' },  // 右侧Y轴
}
```

---

## 15. 完整配置示例

```javascript
import { Column } from '@ant-design/charts';

const config = {
    data,
    xField: 'region',
    yField: 'value',
    
    // 尺寸
    padding: [40, 20, 50, 50],
    
    // 柱体
    color: '#0071E3',
    columnWidthRatio: 0.5,
    columnStyle: { radius: [4, 4, 0, 0] },
    
    // X轴
    xAxis: {
        label: {
            autoRotate: false,
            rotate: -Math.PI / 4,
            style: { fontSize: 11, fill: '#86868B', textAlign: 'end' },
        },
        line: { style: { stroke: '#E8E8ED' } },
        tickLine: null,
    },
    
    // Y轴
    yAxis: {
        label: {
            style: { fontSize: 11, fill: '#86868B' },
            formatter: (v) => v.toLocaleString(),
        },
        grid: { line: { style: { stroke: '#E8E8ED', lineDash: [4, 4] } } },
        line: null,
        tickLine: null,
    },
    
    // 数据标签
    label: {
        position: 'top',
        offset: 8,
        style: { fontSize: 11, fill: '#0071E3' },
    },
    
    // 图例
    legend: {
        position: 'top-right',
        itemSpacing: 20,
    },
    
    // Tooltip
    tooltip: {
        formatter: (datum) => ({
            name: datum.region,
            value: datum.value.toLocaleString() + ' 万元',
        }),
    },
};
```
