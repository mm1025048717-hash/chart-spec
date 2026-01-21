# 进度条设计规范

## 图表标识
- **类型**: Progress
- **组件**: `@antv/g2plot` - RingProgress / CSS
- **用途**: 展示任务进度或指标完成情况，支持线性、圆形、步骤等多种形式

---

## 1. 线性进度条规范

### 尺寸规范
| 参数 | 值 | 说明 |
|-----|---|-----|
| 高度 | `8px` | 进度条高度 |
| 圆角 | `4px` | 进度条圆角 |
| 背景色 | `#E8E8ED` | 未完成部分颜色 |

### CSS 实现
```css
.progress-bar {
    height: 8px;
    background: #E8E8ED;
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    border-radius: 4px;
    background: linear-gradient(90deg, #5B8FF9, #409CFF);
    transition: width 0.6s ease;
}
```

---

## 2. 圆形进度条规范

### G2Plot 配置
| 参数 | 值 | 说明 |
|-----|---|-----|
| `percent` | 0-1 | 进度百分比 |
| `innerRadius` | `0.85` | 内径比例 |
| `radius` | `1` | 外径比例 |
| `statistic.title.style.fontSize` | `20-24px` | 中心文字字号 |

```javascript
new G2Plot.RingProgress('container', {
    percent: 0.85,
    color: ['#5B8FF9', '#E8E8ED'],
    innerRadius: 0.85,
    radius: 1,
    statistic: {
        title: {
            style: { fontSize: '20px', fontWeight: 700, color: '#1D1D1F' },
            formatter: () => '85%',
        },
        content: false,
    },
});
```

---

## 3. 步骤进度条规范

### CSS 实现
```css
.step-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #E8E8ED;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    color: #86868B;
}

.step-item.completed .step-circle {
    background: #5B8FF9;
    color: #fff;
}

.step-item.active .step-circle {
    background: #fff;
    border: 2px solid #5B8FF9;
    color: #5B8FF9;
}

/* 连接线 */
.step-item:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 16px;
    left: 50%;
    width: 100%;
    height: 2px;
    background: #E8E8ED;
}

.step-item.completed:not(:last-child)::after {
    background: #5B8FF9;
}
```

---

## 4. 颜色语义规范

| 状态 | 颜色 | 渐变 | 用途 |
|-----|-----|-----|-----|
| 进行中 | `#5B8FF9` | `linear-gradient(90deg, #5B8FF9, #409CFF)` | 默认进度 |
| 已完成 | `#5AD8A6` | `linear-gradient(90deg, #5AD8A6, #5AC37C)` | 达标/完成 |
| 警告 | `#F6BD16` | `linear-gradient(90deg, #F6BD16, #FAD34A)` | 接近阈值 |
| 异常 | `#E86452` | `linear-gradient(90deg, #E86452, #FF6961)` | 未达标/错误 |

---

## 5. 标签规范

### 进度标签
| 参数 | 值 | 说明 |
|-----|---|-----|
| 标签字号 | `13px` | 进度项名称 |
| 标签颜色 | `#1D1D1F` | 进度项名称颜色 |
| 数值字号 | `13px` | 百分比数值 |
| 数值字重 | `600` | 百分比数值字重 |

---

## 6. 使用建议

| 建议 | 说明 |
|-----|-----|
| 颜色语义 | 使用颜色表示状态：蓝色（进行中）、绿色（已完成）、黄色（警告）、红色（异常） |
| 数值显示 | 建议显示百分比或具体数值，帮助用户了解进度 |
| 适用场景 | 适合展示任务进度、KPI达成率、文件上传进度等 |

---

## 7. 完整配置示例

### 圆形进度条
```javascript
const config = {
    percent: 0.85,
    color: ['#5B8FF9', '#E8E8ED'],
    innerRadius: 0.85,
    radius: 1,
    statistic: {
        title: {
            style: { fontSize: '20px', fontWeight: 700, color: '#1D1D1F' },
            formatter: () => '85%',
        },
        content: false,
    },
};
```

### 线性进度条（HTML + CSS）
```html
<div class="progress-item">
    <div class="progress-header">
        <span class="progress-label">销售额目标</span>
        <span class="progress-value">92%</span>
    </div>
    <div class="progress-bar">
        <div class="progress-fill blue" style="width: 92%;"></div>
    </div>
</div>
```

---

## 8. 文件结构

```
26-progress/
├── index.html    # 可视化展示（带标注）
└── spec.md       # 设计规范文档
```
