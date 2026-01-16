# 条形图设计规范

## 图表标识
- **类型**: Bar Chart
- **组件**: `@ant-design/charts` - Bar
- **用途**: 水平展示分类数据，适合长标签

---

## 1. 适用场景

| 场景 | 示例 |
|-----|------|
| 排行榜 | 销量TOP10 |
| 长标签 | 产品名称对比 |
| 进度展示 | 任务完成进度 |
| 问卷统计 | 选项分布 |

---

## 2. 核心配置

```javascript
const config = {
    data,
    xField: 'value',      // 数值字段（水平）
    yField: 'category',   // 分类字段（垂直）
    color: '#5B8FF9',
    barWidthRatio: 0.5,
    barStyle: {
        radius: [0, 4, 4, 0],  // 右侧圆角
    },
};
```

---

## 3. 圆角规范

条形图圆角在右侧（数值增长方向）：
```javascript
barStyle: {
    radius: [0, 4, 4, 0],  // [左上, 右上, 右下, 左下]
}
```

---

## 4. 标签配置

```javascript
label: {
    position: 'right',     // 右侧显示
    style: {
        fill: '#5B8FF9',
        fontSize: 11,
    },
    formatter: (datum) => datum.value.toLocaleString(),
}
```

---

## 5. 文件结构

```
03-bar/
├── index.html
└── spec.md
```
