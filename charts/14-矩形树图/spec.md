# 矩形树图设计规范

## 图表标识
- **类型**: Treemap
- **用途**: 展示层级数据的构成占比

## 数据结构
```javascript
{
    name: 'root',
    children: [
        { name: 'A', value: 100 },
        { name: 'B', children: [...] },
    ],
}
```

## 核心配置
```javascript
{
    colorField: 'name',
    rectStyle: { stroke: '#fff', lineWidth: 2 },
}
```
