# 面积图设计规范

## 图表标识
- **类型**: Area Chart
- **组件**: `@ant-design/charts` - Area
- **用途**: 强调数值变化的程度和总量

---

## 核心配置

```javascript
const config = {
    data,
    xField: 'date',
    yField: 'value',
    smooth: true,
    color: '#5AD8A6',
    areaStyle: {
        fillOpacity: 0.3,
    },
    line: {
        style: { lineWidth: 2 },
    },
};
```

---

## 堆叠配置

```javascript
{
    seriesField: 'type',
    isStack: true,
}
```

---

## 文件结构

```
05-area/
├── index.html
└── spec.md
```
