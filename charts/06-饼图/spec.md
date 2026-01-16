# 饼图设计规范

## 图表标识
- **类型**: Pie Chart
- **组件**: `@ant-design/charts` - Pie
- **用途**: 展示各部分占整体的比例

---

## 核心配置

```javascript
const config = {
    data,
    angleField: 'value',   // 数值字段
    colorField: 'type',    // 分类字段
    radius: 0.8,
    innerRadius: 0,        // 0=饼图, >0=环图
};
```

---

## 环形图配置

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

## 颜色规范

```javascript
color: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E86452', '#9270CA']
```

---

## 文件结构

```
06-pie/
├── index.html
└── spec.md
```
