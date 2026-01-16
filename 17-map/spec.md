# 地图设计规范

## 图表标识
- **类型**: Map (地理可视化)
- **库**: @antv/l7plot 或 @antv/l7
- **用途**: 地理位置相关数据展示

## 主要类型

### 区域地图 Choropleth
```javascript
import { Choropleth } from '@antv/l7plot';
```
适用：行政区划数据

### 散点地图 DotMap
```javascript
import { DotMap } from '@antv/l7plot';
```
适用：精确坐标点位

### 热力地图 HeatMap
适用：密度分布数据

## 注意事项
1. 需要 GeoJSON 地理数据
2. 需要地图服务 API Key
