# 饼图设计规范

## 图表标识
- **类型**: Pie Chart
- **组件**: `@ant-design/charts` - Pie
- **用途**: 展示各部分占整体的比例

---

## 1. 核心配置

| 参数 | 值 | 说明 |
|-----|---|-----|
| angleField | string | 数值字段 |
| colorField | string | 分类字段 |
| radius | `0.8` | 外半径 |
| innerRadius | `0` / `0.6` | 内半径 (0=饼图) |

---

## 2. 标签规范

### 外部标签（推荐）
```javascript
label: {
    type: 'outer',
    content: '{name} {percentage}',
    style: { fontSize: 11 },
}
```

### 内部标签（环形图）
```javascript
label: {
    type: 'inner',
    offset: '-50%',
    content: '{percentage}',
    style: { fontSize: 10, fill: '#fff' },
}
```

---

## 3. 环形图配置

```javascript
{
    innerRadius: 0.6,
    statistic: {
        title: { content: '总计' },
        content: { content: '13,000' },
    },
}
```

---

## 4. 颜色规范

```javascript
color: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E86452', '#9270CA']
```

---

## 5. 使用建议

| 建议 | 说明 |
|-----|-----|
| 分类数量 | ≤7个 |
| 最小占比 | ≥5% (否则难以识别) |
| 环形图中心 | 放置关键指标 |
